

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "Reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

interface IBEP20 {
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);
}

contract RamicoinAffiliateProgram is ReentrancyGuard {
    IBEP20 public immutable usdt;
    IBEP20 public immutable ramicoin;
    address public owner;
    address public ownerTreasury;

    uint256 public constant MIN_PURCHASE = 50 * 1e18;
    uint256 public constant RAMICOIN_PRICE = 0.005 * 1e18;
    uint256 public constant COMMISSION_RATE = 3;

    uint256 public userCount;
    bytes private constant CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    uint256 public totalSalesVolume;
    uint256 public totalReferralCount;

    struct User {
        string referralCode;
        address referrer;
        uint256 referralCount;
        uint256 salesVolume;
        uint256 totalRamicoinEarned;
        bool exists;
    }

    mapping(address => User) public users;
    mapping(string => address) public referralCodes;

    event ReferralRegistered(address indexed user, string code);
    event PurchaseCompleted(address indexed user, uint256 ramicoinReceived);
    event CommissionPaid(address indexed referrer, uint256 ramicoinAmount);
    event TreasuryUpdated(address newTreasury);
    event TokensRecovered(address token, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    constructor(
        address _usdt,
        address _ramicoin,
        address _treasury
    ) {
        usdt = IBEP20(_usdt);
        ramicoin = IBEP20(_ramicoin);
        owner = msg.sender;
        ownerTreasury = _treasury;

        userCount = 1;
        _assignCode(owner, 0);
        users[owner] = User({
            referralCode: "",
            referrer: address(0),
            referralCount: 0,
            salesVolume: 0,
            totalRamicoinEarned: 0,
            exists: true
        });
    }

    // ================== USER FUNCTIONS ==================
    function generateReferralCode() external {
        require(!users[msg.sender].exists, "Already registered");
        _assignCode(msg.sender, userCount);
        userCount++;
        users[msg.sender].exists = true;
    }

    function purchase(uint256 usdtAmount, string calldata referralCode)
        external
        nonReentrant
    {
        require(usdtAmount >= MIN_PURCHASE, "Below minimum purchase");

        if (!users[msg.sender].exists) {
            _assignCode(msg.sender, userCount);
            userCount++;
            users[msg.sender].exists = true;
        }

        users[msg.sender].salesVolume += usdtAmount;
        totalSalesVolume += usdtAmount;

        address referrer = referralCodes[referralCode];
        if (referrer != address(0)) {
            users[referrer].referralCount++;
            totalReferralCount++;

            uint256 commission = (usdtAmount * COMMISSION_RATE) / 100;
            uint256 ramicoinCommission = (commission * 1e18) / RAMICOIN_PRICE;

            _safeTransferRamicoin(referrer, ramicoinCommission);
            users[referrer].totalRamicoinEarned += ramicoinCommission;
            emit CommissionPaid(referrer, ramicoinCommission);
        }

        require(
            usdt.transferFrom(msg.sender, ownerTreasury, usdtAmount),
            "USDT transfer failed"
        );

        uint256 ramicoinAmount = (usdtAmount * 1e18) / RAMICOIN_PRICE;
        _safeTransferRamicoin(msg.sender, ramicoinAmount);
        emit PurchaseCompleted(msg.sender, ramicoinAmount);
    }

    // ================== ADMIN FUNCTIONS ==================
    function setTreasury(address _treasury) external onlyOwner {
        ownerTreasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function withdrawRamicoin(uint256 amount) external onlyOwner {
        _safeTransferRamicoin(owner, amount);
    }

    // Universal token recovery (for accidental transfers)
    function recoverToken(IBEP20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(token.transfer(owner, balance), "Transfer failed");
        emit TokensRecovered(address(token), balance);
    }

    // ================== CORE LOGIC ==================
    function _assignCode(address _user, uint256 codeNumber) internal {
        bytes memory code = new bytes(6);
        uint256 num = codeNumber;

        for (uint256 i = 0; i < 6; i++) {
            code[5 - i] = CHARSET[num % 32];
            num = num / 32;
        }

        string memory codeStr = string(code);
        users[_user].referralCode = codeStr;
        referralCodes[codeStr] = _user;
        emit ReferralRegistered(_user, codeStr);
    }

    function _safeTransferRamicoin(address to, uint256 amount) internal {
        require(
            ramicoin.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        require(ramicoin.transfer(to, amount), "Transfer failed");
    }

    // Explicitly reject accidental BNB transfers
    receive() external payable {
        revert("BNB not accepted");
    }
}
