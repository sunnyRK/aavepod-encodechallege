pragma solidity ^0.6.0;

import "./helper/Ownable.sol";
import "./helper/SafeMath.sol";

import "./interfaces/IERC20.sol";
import "./interfaces/ERC20.sol";
import "./interfaces/aaveInterface/ILendingPoolAddressesProvider.sol";
import "./interfaces/aaveInterface/ILendingPool.sol";
import "./interfaces/aaveInterface/IAToken.sol";
import "./interfaces/storageInterface/IPodStorageInterface.sol";
import "./interfaces/aaveInterface/AaveCoreInterface.sol";
import "./interfaces/aaveInterface/ATokenInterface.sol";

import "./factory/PodFactory.sol";
import "./storage/podStorage.sol";

contract aavepod is Ownable{
    
    using SafeMath for uint256;
    uint256 public nonce = 0;
    uint256 public winnerNumber;
    
    // Aave contracts
    ILendingPoolAddressesProvider aaveProvider;
    ILendingPool aaveLendingPool;
    IAToken aTokenInstance;
    uint16 constant private referral = 0;

    ATokenInterface public atoken;
    AaveCoreInterface public aaveCore;
    IERC20 public regularToken;
    IERC20 public aaveToken;
    IPodStorageInterface iPodStorageInterface;
    
    // Events
    event Deposit(uint256 amount, address indexed user, address indexed tokenAddress);
    event WinnerDeclare(uint256 _betId, uint256 interest, address indexed user);
    event WithDraw(uint256 _betId, uint256 amount, address indexed user, address indexed tokenAddress);

    constructor(uint256 _minimumVal, uint256 _numOfStakers, uint256 timeStamp, address _podManager, address _tokenAddress, address _aaveAddress, string memory _betName) public Ownable() {
        iPodStorageInterface = IPodStorageInterface(0x4c4F39bDFc3178f0b077D97752D413FBcB3CBEef);
        regularToken = IERC20(_tokenAddress);
        aaveToken = IERC20(_aaveAddress);
        
        uint256 betId = now;
        iPodStorageInterface.setBetIDManager(betId, _podManager);
        iPodStorageInterface.setBetIDOnConstructor(betId, _minimumVal, _numOfStakers, _betName);
        iPodStorageInterface.addNewBetId(betId, _podManager);
        
        // kovan addresses
        address aaveLendingPoolAddressesProvider = 0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5;
        
        aaveProvider = ILendingPoolAddressesProvider(aaveLendingPoolAddressesProvider);
        aaveLendingPool = ILendingPool(aaveProvider.getLendingPool());
    }
    
    function addStakeOnBet(uint256 _betId, uint256 amount) public {
        require(!iPodStorageInterface.getStakingDone(_betId) && !iPodStorageInterface.getWinnerDeclare(_betId), "No more space for stakers");            
        require(iPodStorageInterface.getMinimumContribution(_betId) >= amount, "Amount should be greater or equal to minimumContribution");
        
        uint256 numStakers = iPodStorageInterface.getNumOfStakers(_betId);
        iPodStorageInterface.setNewStakerForBet(_betId, msg.sender);
        iPodStorageInterface.increaseStakerCount(_betId);
        
        if(numStakers == iPodStorageInterface.getStakeCount(_betId)) {
            iPodStorageInterface.setStakingDone(_betId); ////After true, no more stakers will be accepted
        }
        
        iPodStorageInterface.setStakeforBet(_betId, amount, msg.sender);
        iPodStorageInterface.addAmountInTotalStake(_betId, amount);
        
        // address daiAddress = address(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD); // kovan DAI
        regularToken.transferFrom(msg.sender, address(this), amount);
        regularToken.approve(aaveProvider.getLendingPoolCore(), amount);
        aaveLendingPool.deposit(address(regularToken), amount, referral);
        emit Deposit(amount, msg.sender, address(regularToken));
    }
    
    function winnerDeclareAndRefundStake(uint256 _betId) public {
        require(!iPodStorageInterface.getWinnerDeclare(_betId), "Winner declare and bet is expired.");
        require(iPodStorageInterface.getStakeCount(_betId) == iPodStorageInterface.getNumOfStakers(_betId), "Stakers is not full.");
        require(now > iPodStorageInterface.getTimestamp(_betId), "Timstamp is not crossed.");
        uint256 winnnerNum = winnerSelector(iPodStorageInterface.getLengthOfStakersARray(_betId));
        uint256 interest = getBalanceofAaveToken(address(this)) - iPodStorageInterface.getTotalStakeFromBet(_betId);
        address[] memory stakers = iPodStorageInterface.getStakersArrayForBet(_betId);
        for(uint i=0; i<stakers.length; i++) {
            if(!iPodStorageInterface.getRedeemFlagStakerOnBet(_betId, stakers[i])) {
                if(winnnerNum != i) {
                    aaveToken.transfer(stakers[0], iPodStorageInterface.getStakeforBet(_betId, stakers[i]));
                } else {
                    aaveToken.transfer(stakers[1], iPodStorageInterface.getStakeforBet(_betId, stakers[i]) + interest);
                }   
            }
        }
        iPodStorageInterface.setWinnerDeclare(_betId);
        iPodStorageInterface.setWinnerAddress(_betId, stakers[winnnerNum]);
        emit WinnerDeclare(_betId, interest, stakers[winnnerNum]);
    }

    function redeemFromBetBeforeFinish(uint256 _betId) public  {
        require(!iPodStorageInterface.getWinnerDeclare(_betId) && 
            !iPodStorageInterface.getRedeemFlagStakerOnBet(_betId, msg.sender), 
            "Winner declare and bet is expired"
        );
        
        iPodStorageInterface.setRedeemFlagStakerOnBet(_betId, msg.sender);
        iPodStorageInterface.subtractAmountInTotalStake(_betId, iPodStorageInterface.getStakeforBet(_betId, msg.sender));
        iPodStorageInterface.decreaseStakerCount(_betId);

        aaveCore = AaveCoreInterface(aaveProvider.getLendingPoolCore());
        atoken = ATokenInterface(aaveCore.getReserveATokenAddress(address(regularToken)));
        atoken.redeem(iPodStorageInterface.getStakeforBet(_betId, msg.sender));
        regularToken.transfer(msg.sender, iPodStorageInterface.getStakeforBet(_betId, msg.sender));
        emit WithDraw(_betId, iPodStorageInterface.getStakeforBet(_betId, msg.sender), msg.sender, address(regularToken));
    }
    
    function getBalanceofAaveToken(address _owner) public view returns(uint256) {
        return aaveToken.balanceOf(_owner);
    }
    
    function getBalanceofRefularToken(address _owner) public view returns(uint256) {
        return regularToken.balanceOf(_owner);
    }
    
    function winnerSelector(uint256 length) internal returns(uint256) {
        winnerNumber = uint(keccak256(abi.encodePacked(now, msg.sender, nonce))) % length;
        nonce++;        
        return winnerNumber;
    }
}