/**
 *Submitted for verification at BscScan.com on 2024-06-29
*/

/**
 *Submitted for verification at testnet.bscscan.com on 2024-06-26
 */

/**
 *Submitted for verification at BscScan.com on 2024-05-26
 */

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * onlyOwner functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (newOwner).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (newOwner).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's + operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's - operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's * operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's / operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's % operator. This function uses a revert
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's - operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's / operator. Note: this function uses a
     * revert opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's % operator. This function uses a revert
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

interface IERC20 {
    /**
     * @dev Emitted when value tokens are moved from one account (from) to
     * another (to).
     *
     * Note that value may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a spender for an owner is set by
     * a call to {approve}. value is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by account.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves amount tokens from the caller's account to to.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that spender will be
     * allowed to spend on behalf of owner through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    /**
     * @dev Sets amount as the allowance of spender over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves amount tokens from from to to using the
     * allowance mechanism. amount is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract Presale is Ownable {
    using SafeMath for uint;
    IERC20 public RamiCoinAddress;
    IERC20 public usdtAddress;
    IERC20 public btcAddress;
    uint public bnbPrice;
    uint public usdtPrice;
    uint public btcPrice;
    uint public tokenSold;

    address payable public seller;

    event tokenPurchased(address buyer, uint price, uint tokenValue);

    constructor(
        IERC20 _RamiCoinAddress,
        IERC20 _usdtAddress,
        IERC20 _btcAddress,
        uint _bnbPrice,
        uint _usdtPrice,
        uint _btcPrice
    ) {
        RamiCoinAddress = _RamiCoinAddress;
        usdtAddress = _usdtAddress;
        btcAddress = _btcAddress;
        btcPrice = _btcPrice;
        bnbPrice = _bnbPrice;
        usdtPrice = _usdtPrice;
        seller = payable(_msgSender());
    }

    receive() external payable {
        buyWithBNB();
    }

    function tokenForSale() public view returns (uint) {
        return RamiCoinAddress.allowance(seller, address(this));
    }

    function buyWithBNB() public payable returns (bool) {
        require(_msgSender() != address(0), "Null address can't buy tokens");
        //calculate tokens value against reciving amount
        uint _tokenValue = msg.value.mul(bnbPrice);
        require(
            _tokenValue <= tokenForSale(),
            "Remaining tokens less than buying value"
        );

        //transfer ETH to seller address
        seller.transfer(address(this).balance);

        //transfer tokens to buyer address
        RamiCoinAddress.transferFrom(seller, _msgSender(), _tokenValue);

        //update tokenSold variable
        tokenSold += _tokenValue;

        //Fire tokenPurchased event
        emit tokenPurchased(_msgSender(), bnbPrice, _tokenValue);

        return true;
    }

    // USDT Token
    function buyWithUSDT(uint _usdtAmount) public returns (bool) {
        require(_msgSender() != address(0), "Null address can't buy tokens");
        require(_usdtAmount > 0, "Buy Amount should be greater than zero");
        uint _tokenValue = _usdtAmount.mul(usdtPrice);
        require(
            _tokenValue <= tokenForSale(),
            "Remaining tokens less than buying value"
        );

        require(
            usdtAddress.transferFrom(_msgSender(), seller, _usdtAmount),
            "Transfer of TokenB failed"
        );

        RamiCoinAddress.transferFrom(seller, _msgSender(), _tokenValue);

        tokenSold += _tokenValue;

        emit tokenPurchased(_msgSender(), usdtPrice, _tokenValue);

        return true;
    }

    // BTC Token
    function buyWithBTC(uint _btcAmount) public returns (bool) {
        require(_msgSender() != address(0), "Null address can't buy tokens");
        require(_btcAmount > 0, "Buy Amount should be greater than zero");
        uint _tokenValue = _btcAmount.mul(btcPrice);
        require(
            _tokenValue <= tokenForSale(),
            "Remaining tokens less than buying value"
        );

        require(
            btcAddress.transferFrom(_msgSender(), seller, _btcAmount),
            "Transfer of TokenB failed"
        );

        RamiCoinAddress.transferFrom(seller, _msgSender(), _tokenValue);

        tokenSold += _tokenValue;

        emit tokenPurchased(_msgSender(), btcPrice, _tokenValue);

        return true;
    }

    function setBnbPrice(uint _newBnbPrice) public onlyOwner {
        bnbPrice = _newBnbPrice;
    }

    function setUsdtPrice(uint _newUsdtPrice) public onlyOwner {
        usdtPrice = _newUsdtPrice;
    }

    function setBtcPrice(uint _newBtcPrice) public onlyOwner {
        btcPrice = _newBtcPrice;
    }

    function updateSeller(address payable _newSeller) public onlyOwner {
        seller = _newSeller;
    }

    function updateTokenAddress(IERC20 _tokenAddress) public onlyOwner {
        RamiCoinAddress = _tokenAddress;
    }

    function withdrawToken(
        IERC20 _tokenAddress
    ) public onlyOwner returns (bool) {
        uint tokenBalance = _tokenAddress.balanceOf(address(this));
        _tokenAddress.transfer(seller, tokenBalance);
        return true;
    }

    function withdrawFunds() public onlyOwner returns (bool) {
        seller.transfer(address(this).balance);
        return true;
    }
}