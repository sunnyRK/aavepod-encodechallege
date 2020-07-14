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

interface AaveCoreInterface {
    function getReserveATokenAddress(address _reserve) external view returns (address);
}

interface ATokenInterface {
    function redeem(uint256 _amount) external;
    function balanceOf(address _user) external view returns(uint256);
    function principalBalanceOf(address _user) external view returns(uint256);
}

contract PodFactory{
    address[] public podAddress;
        
    function createPod(uint256 minimum, uint256 numstakers, uint256 timeStamp, address tokenAddress, address aaveAddress, string memory betName) public{
        aavepod newPod = new aavepod(minimum, numstakers, timeStamp, tokenAddress, aaveAddress, msg.sender, betName);
        podAddress.push(address(newPod));
    }
    
    function getPods() public view returns (address[] memory){
        return podAddress;
    }
}

contract podStorage {
        
    struct betInfo {
        uint256 betId; // constructor
        uint256 minimumContribution; //constructor
        uint256 numOfStakers; // constructor
        uint256 stakerCount;
        bool isWinnerDeclare; // WinnerDeclation  or reddemPod
        bool isStakingDone; // DepositPod
        string betName; //constructor
        address winnerAddress; // Winner declare during
    }
    
    mapping(uint256 => uint256) public timeStamp;
    mapping(uint256 => address) public betIdMapping; // address manger of bet id
    mapping(address => uint256[]) public betIdsOfManager;
    mapping(uint256 => betInfo) public betInfoMapping; // bet info in struct for bet id
    mapping(uint256 => mapping(address => uint256)) public stakeOnBetId; // amount of stakers on betId
    mapping(uint256 => uint256) public totalValueOnBet; // totak stake on bet id
    mapping(uint256 => address[]) public stakersOfBet; // stakers array address for bet id  
    mapping(uint256 => mapping(address => bool)) isRedeem; // redeem money before bet ends
    // If true then cant be winner and after completion 
    //stake will not refund because it is already redeem
    
    function setBetIDManager(uint256 betId, address manager) public {
        betIdMapping[betId] = manager;
    }
    
    function getBetIdManager(uint256 betId) public view returns(address) {
        return betIdMapping[betId];
    }
    
    function addNewBetId(uint256 betId, address manager) public {
        betIdsOfManager[manager].push(betId);
    }
    
    function getBetIdArrayOfManager(address manager) public view returns(uint256[] memory) {
        return betIdsOfManager[manager];
    }
    
    function getLengthOfBetIds(address manager) public view returns(uint256) {
        return betIdsOfManager[manager].length;
    }
    
    function setBetIDOnConstructor(
        uint256 betId, 
        uint256 minimumContribution, 
        uint256 numOfStakers, 
        string memory betName
    ) public {
        betInfoMapping[betId].minimumContribution = minimumContribution;
        betInfoMapping[betId].numOfStakers = numOfStakers;
        betInfoMapping[betId].betName = betName;
    }
    
    function setStakingDone(uint256 betId) public {
        betInfoMapping[betId].isStakingDone = true;
    }
    
    function setWinnerDeclare(uint256 betId) public {
        betInfoMapping[betId].isWinnerDeclare = true;
    }
    
    function setWinnerAddress(uint256 betId, address winnerAddress) public {
        betInfoMapping[betId].winnerAddress = winnerAddress;
    }
    
    function setTimestamp(uint256 betId, uint256 timestamp) public {
        timeStamp[betId] = now + (timestamp*86400);
    }
    
    function getTimestamp(uint256 betId) public view returns(uint256) {
        return timeStamp[betId];
    }
    
    function getMinimumContribution(uint256 betId) public view returns(uint256) {
        return betInfoMapping[betId].minimumContribution;
    }
    
    function getNumOfStakers(uint256 betId) public view returns(uint256) {
        return betInfoMapping[betId].numOfStakers;
    }
    
    function getStakingDone(uint256 betId) public view returns(bool) {
        return betInfoMapping[betId].isStakingDone;
    }
    
    function getWinnerDeclare(uint256 betId) public view returns(bool) {
        return betInfoMapping[betId].isWinnerDeclare;
    }
    
    function getWinnerAddress(uint256 betId) public view returns(address) {
        return betInfoMapping[betId].winnerAddress;
    }

    function increaseStakerCount(uint256 betId) public {
        betInfoMapping[betId].stakerCount = betInfoMapping[betId].stakerCount + 1;
    }
    
    function decreaseStakerCount(uint256 betId) public {
        betInfoMapping[betId].stakerCount = betInfoMapping[betId].stakerCount - 1;
    }
    
    function getStakeCount(uint256 betId) public view returns(uint256) {
        return betInfoMapping[betId].stakerCount;
    }

    function setStakeforBet(uint256 betId, uint256 amount, address staker) public {
        stakeOnBetId[betId][staker] = amount;
    }
    
    function getStakeforBet(uint256 betId, address staker) public view returns(uint256) {
        return stakeOnBetId[betId][staker];
    }
    
    function addAmountInTotalStake(uint256 betId, uint256 amount) public {
        totalValueOnBet[betId] = totalValueOnBet[betId] + amount;
    }
    
    function subtractAmountInTotalStake(uint256 betId, uint256 amount) public {
        totalValueOnBet[betId] = totalValueOnBet[betId] - amount;
    }
    
    function getTotalStakeFromBet(uint256 betId) public view returns(uint256) {
        return totalValueOnBet[betId];
    }
    
    function setNewStakerForBet(uint256 betId, address staker) public {
        stakersOfBet[betId].push(staker);
    }
    
    function getStakersArrayForBet(uint256 betId) public view returns(address[] memory){
        return stakersOfBet[betId];
    }
    
    function getLengthOfStakersARray(uint256 betId) public view returns(uint256) {
        return stakersOfBet[betId].length;
    }
    
    function setRedeemFlagStakerOnBet(uint256 betId, address staker) public {
        isRedeem[betId][staker] = true;
    }
    
    function setRevertRedeemFlagStakerOnBet(uint256 betId, address staker) public {
        isRedeem[betId][staker] = false;
    }
    
    function getRedeemFlagStakerOnBet(uint256 betId, address staker) public view returns(bool) {
        return isRedeem[betId][staker];
    }
    
}

interface IPodStorageInterface {
    function setBetIDManager(uint256 betId, address manager) external;
    function setBetIDOnConstructor(
        uint256 betId, 
        uint256 minimumContribution, 
        uint256 numOfStakers, 
        string memory betName
    ) external;
    function addNewBetId(uint256 betId, address manager) external;
    function setStakingDone(uint256 betId) external;
    function setWinnerDeclare(uint256 betId) external;
    function setWinnerAddress(uint256 betId, address winnerAddress) external;
    function setStakeforBet(uint256 betId, uint256 amount, address staker) external;
    function addAmountInTotalStake(uint256 betId, uint256 amount) external;
    function subtractAmountInTotalStake(uint256 betId, uint256 amount) external;
    function setNewStakerForBet(uint256 betId, address staker) external;
    function setRedeemFlagStakerOnBet(uint256 betId, address staker) external;
    function setRevertRedeemFlagStakerOnBet(uint256 betId, address staker) external;
    function increaseStakerCount(uint256 betId) external;
    function decreaseStakerCount(uint256 betId) external;
    function setTimestamp(uint256 betId, uint256 timestamp) external;
        
    function getTimestamp(uint256 betId) external view returns(uint256);
    function getStakeCount(uint256 betId) external view returns(uint256);
    function getBetIdManager(uint256 betId) external view returns(address);
    function getLengthOfBetIds(address manager) external view returns(uint256);
    function getBetIdArrayOfManager(address manager) external view returns(uint256[] memory);
    function getMinimumContribution(uint256 betId) external view returns(uint256);
    function getNumOfStakers(uint256 betId) external view returns(uint256);
    function getStakingDone(uint256 betId) external view returns(bool);
    function getWinnerDeclare(uint256 betId) external view returns(bool);
    function getWinnerAddress(uint256 betId) external view returns(address);
    function getStakeforBet(uint256 betId, address staker) external view returns(uint256);
    function getTotalStakeFromBet(uint256 betId) external view returns(uint256);
    function getStakersArrayForBet(uint256 betId) external view returns(address[] memory);
    function getLengthOfStakersARray(uint256 betId) external view returns(uint256);
    function getRedeemFlagStakerOnBet(uint256 betId, address staker) external view returns(bool);
}

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
        atoken = ATokenInterface(aaveCore.getReserveATokenAddress(0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD));
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