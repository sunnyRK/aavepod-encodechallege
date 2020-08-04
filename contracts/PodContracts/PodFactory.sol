pragma solidity ^0.6.0;

import "../aavepod.sol";

contract PodFactory is Ownable{
    address[] public podAddress;
        
    IPodStorageInterface iPodStorageInterface;    
    
    constructor(address podStorageAddress) public {
        iPodStorageInterface = IPodStorageInterface(podStorageAddress);
    }
    
    function createPod( 
        uint256 minimum, 
        uint256 numstakers, 
        uint256 timeStamp, 
        address tokenAddress, 
        address aaveAddress, 
        string memory betName
        
    ) public onlyOwner {
        aavepod newPod = new aavepod(minimum, numstakers, timeStamp, 
        tokenAddress, aaveAddress, msg.sender, betName,
        address(iPodStorageInterface), 0xc85a4CB1851F5ECB9CF6a5a5889b100FD539D0e9);
        podAddress.push(address(newPod));
    }
    
    // This is storage of Pod smart contract.
    // In future if we change the storage we can set that address using this function
    function setPodStorageAddress(address podStorageAddress) public {
        iPodStorageInterface = IPodStorageInterface(podStorageAddress);
    }
    
    function getPods() public view returns (address[] memory){
        return podAddress;
    }
}