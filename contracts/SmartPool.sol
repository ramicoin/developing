/**
 *Submitted for verification at testnet.bscscan.com on 2025-03-03
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Combined OpenZeppelin IERC20, Ownable, and ReentrancyGuard into a single file

// IERC20 Interface
interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

// Ownable Contract
abstract contract Ownable {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor(address initialOwner) {
        _transferOwnership(initialOwner);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// ReentrancyGuard Contract
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        _status = _NOT_ENTERED;
    }

    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

// RamiStaking Contract
contract RamiStaking is Ownable, ReentrancyGuard {
    IERC20 public immutable usdt; // Immutable for gas optimization and security
    IERC20 public immutable ramicoin; // Immutable for gas optimization and security

    uint256 public totalStakedRami; // Total ramicoin staked by all users
    uint256 public usdtPool; // Total USDT deposited by the owner for rewards
    uint256 public burnPool; // USDT allocated for burning
    uint256 public reservePool; // USDT allocated for reserves
    uint256 public totalActiveStakers;

    // Tracks rewards per staked ramicoin
    uint256 public rewardPerToken;
    mapping(address => uint256) public stakerRewardDebt; // Tracks rewards already claimed by each staker

    struct Staker {
        uint256 stakedAmount; // Amount of ramicoin staked by the user
        uint256 lastStakeTime; // Last time the user staked
    }

    mapping(address => Staker) public ramicoinStakers; // Tracks stakers and their details

    // Track expected USDT balance to prevent direct transfers
    uint256 private _expectedUSDTBalance;

    // Event to log reserve pool withdrawal
    event BurnPoolWithdrawn(uint256 amount, address to, uint256 day);
    event ReservePoolWithdrawn(uint256 amount, address to, uint256 day);
    event USDTDeposited(uint256 amount, uint256 day);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount, uint256 day);

    constructor(address _usdt, address _ramicoin) Ownable(msg.sender) {
        require(_usdt != address(0), "USDT address cannot be zero");
        require(_ramicoin != address(0), "Ramicoin address cannot be zero");
        usdt = IERC20(_usdt);
        ramicoin = IERC20(_ramicoin);
        _expectedUSDTBalance = usdt.balanceOf(address(this)); // Initialize expected balance
    }

    // Prevent direct Ether transfers to the contract
    receive() external payable {
        revert("Direct Ether transfers are not allowed");
    }

    // Prevent direct token transfers to the contract
    fallback() external {
        revert("Direct token transfers are not allowed");
    }

    // Helper function to get the current day
    function _getCurrentDay() internal view returns (uint256) {
        return block.timestamp / 1 days;
    }

    // withdraw burnpool
    function withdrawBurnPool(address to) external onlyOwner nonReentrant {
        require(burnPool > 0, "Burn pool is empty");
        require(to != address(0), "Invalid address");

        uint256 amount = burnPool; // Capture the entire burnPool balance
        burnPool = 0; // Reset the burnPool to 0

        require(usdt.transfer(to, amount), "Transfer failed"); // Transfer the funds
        emit BurnPoolWithdrawn(amount, to, _getCurrentDay()); // Emit event
    }

    // withdraw reservepool
    function withdrawReservePool(address to) external onlyOwner nonReentrant {
        require(reservePool > 0, "Reserve pool is empty");
        require(to != address(0), "Invalid address");

        uint256 amount = reservePool; // Capture the entire reservePool balance
        reservePool = 0; // Reset the reservePool to 0

        require(usdt.transfer(to, amount), "Transfer failed"); // Transfer the funds
        emit ReservePoolWithdrawn(amount, to, _getCurrentDay()); // Emit event
    }

    // Owner deposits USDT into the reward pool
    function depositUSDT(uint256 amount) external onlyOwner {
        require(amount > 0, "Deposit must be greater than zero");

        // Get the contract's USDT balance before the transfer
        uint256 contractBalanceBefore = usdt.balanceOf(address(this));

        // Transfer USDT from the owner to the contract
        require(
            usdt.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Verify that the contract's USDT balance has increased by the expected amount
        uint256 contractBalanceAfter = usdt.balanceOf(address(this));
        require(
            contractBalanceAfter - contractBalanceBefore == amount,
            "USDT deposit failed"
        );

        // Update expected USDT balance
        _expectedUSDTBalance += amount;

        // Allocate USDT to burn, reserve, and staker pools
        uint256 burnAmount = (amount * 1) / 100; // 1% to burn
        uint256 reserveAmount = (amount * 4) / 100; // 4% to reserve
        uint256 stakerAmount = amount - (burnAmount + reserveAmount); // 95% to stakers

        burnPool += burnAmount;
        reservePool += reserveAmount;
        usdtPool += stakerAmount;

        // Update reward per staked ramicoin
        if (totalStakedRami > 0) {
            rewardPerToken += (stakerAmount * 1e18) / totalStakedRami;
        }

        emit USDTDeposited(amount, _getCurrentDay());
    }

    // Users stake ramicoin to earn USDT rewards
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot stake zero tokens");

        // Check allowance and transfer ramicoin from user to contract
        uint256 allowance = ramicoin.allowance(msg.sender, address(this));
        require(
            allowance >= amount,
            "Allowance too low, approve contract first"
        );
        require(
            ramicoin.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Claim pending rewards before updating staked amount
        _claimRewards(msg.sender);

        // Update staker's details
        Staker storage user = ramicoinStakers[msg.sender];
        if (user.stakedAmount == 0) {
            totalActiveStakers += 1; // Increment active stakers count if this is the first stake
        }
        user.stakedAmount += amount;
        user.lastStakeTime = block.timestamp;

        // Update total staked ramicoin
        totalStakedRami += amount;

        // Update reward debt for the staker
        stakerRewardDebt[msg.sender] =
            (user.stakedAmount * rewardPerToken) /
            1e18;

        emit Staked(msg.sender, amount);
    }

    // Users unstake ramicoin
    function unstake(uint256 amount) external nonReentrant {
        Staker storage user = ramicoinStakers[msg.sender];
        require(user.stakedAmount >= amount, "Not enough staked balance");
        require(
            block.timestamp >= user.lastStakeTime + 48 hours,
            "Tokens are locked"
        );

        // Claim pending rewards before unstaking
        _claimRewards(msg.sender);

        // Update staker's details
        user.stakedAmount -= amount;
        totalStakedRami -= amount;

        // Update reward debt for the staker
        stakerRewardDebt[msg.sender] =
            (user.stakedAmount * rewardPerToken) /
            1e18;

        // If the user unstakes all their tokens, decrement the active stakers count
        if (user.stakedAmount == 0) {
            totalActiveStakers -= 1;
        }

        // Transfer ramicoin back to the user
        require(ramicoin.transfer(msg.sender, amount), "Transfer failed");
        emit Unstaked(msg.sender, amount);
    }

    // Users claim their USDT rewards
    function claim() external nonReentrant {
        Staker storage user = ramicoinStakers[msg.sender];
        require(user.stakedAmount > 0, "No staked balance");

        _claimRewards(msg.sender);
    }

    // Internal function to calculate and transfer pending rewards
    function _claimRewards(address userAddress) internal {
        Staker storage user = ramicoinStakers[userAddress];
        uint256 pendingRewards = (user.stakedAmount * rewardPerToken) /
            1e18 -
            stakerRewardDebt[userAddress];

        if (pendingRewards > 0) {
            stakerRewardDebt[userAddress] =
                (user.stakedAmount * rewardPerToken) /
                1e18;
            require(
                usdt.transfer(userAddress, pendingRewards),
                "Transfer failed"
            );

            emit Claimed(userAddress, pendingRewards, _getCurrentDay());
        }
    }

    // Function to get pending rewards for a user
    function getPendingRewards(
        address userAddress
    ) public view returns (uint256) {
        Staker storage user = ramicoinStakers[userAddress];
        return
            (user.stakedAmount * rewardPerToken) /
            1e18 -
            stakerRewardDebt[userAddress];
    }

    // Function to check if the contract's USDT balance matches the expected balance
    function _checkUSDTBalance() internal view {
        require(
            usdt.balanceOf(address(this)) == _expectedUSDTBalance,
            "Direct USDT transfers are not allowed"
        );
    }
}
