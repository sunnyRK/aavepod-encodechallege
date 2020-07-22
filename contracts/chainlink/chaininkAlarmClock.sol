pragma solidity ^0.6.0;

import "./Ownable.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/ChainlinkClient.sol";

interface IVrf {
    function requestRandomnesses() external returns (bytes32 requestId);
    function getWinnerRandomness() external view returns (uint256 d20result);
}

contract ChainlinkAlarmClock is ChainlinkClient, Ownable {
    
    uint256 oraclePayment;
    string public astr;
    IVrf vrf;
    string public otherstring;

    constructor(uint256 _oraclePayment) public {
        vrf = IVrf(0x6210024E6881a2038a2669C447CdAfC6BE5a3E43);
        setPublicChainlinkToken();
        oraclePayment = _oraclePayment;
    }
    
    // "0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e","a7ab70d561d34eb49e9b1612fd2e044b","1"
    function delayStart (
        address _oracle,
        string memory _jobId,
        uint256 min
    ) public 
    // onlyOwner 
    returns(bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(stringToBytes32(_jobId), address(this), this.fulfill.selector);
        uint256 mins = now.add((min.mul(60)));
        req.addUint("until", mins);
        _requestId = sendChainlinkRequestTo(_oracle, req, oraclePayment);
    }  
    
    function fulfill(bytes32 _requestId)
        public
        recordChainlinkFulfillment(_requestId) {
        //"0x0218141742245eeeba0660e61ef8767e6ce8e7215289a4d18616828caf4dfe33","100000000000000000","1000"
        vrf.requestRandomnesses();
    }
    
    function getWinnerRandomness() public view virtual returns(uint256) {
        return vrf.getWinnerRandomness();
    }
    
    function stringToBytes32(string memory source) public view returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
          return 0x0;
        }
        assembly { // solhint-disable-line no-inline-assembly
          result := mload(add(source, 32))
        }
    }
}