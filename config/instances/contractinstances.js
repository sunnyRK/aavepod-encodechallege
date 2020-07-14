import EthIcon from '../../src/assets/icons/eth.svg';
import DaiIcon from '../../src/assets/icons/dai.svg';
import TrbIcon from '../../src/assets/icons/trb.png';
import BatIcon from '../../src/assets/icons/bat.svg';
import ZrxIcon from '../../src/assets/icons/zrx.svg';

// Pod Factory Instance
export function getFactoryContract(web3) {
    const abi = '[{"inputs":[{"internalType":"uint256","name":"minimum","type":"uint256"},{"internalType":"uint256","name":"numstakers","type":"uint256"},{"internalType":"uint256","name":"timeStamp","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"aaveAddress","type":"address"},{"internalType":"string","name":"betName","type":"string"}],"name":"createPod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPods","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"podAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]';
    const address = "0xD6E2104fC38F83c0846F1584FAf6D3586d1DA19F"; //kovan
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}

// ERC20 Instance for any token
export function getERCContractInstance(web3, tokenSymbol) {
    let abi;
    abi ='[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
    const address = TokenInfoArray[0][tokenSymbol].token_contract_address;
    const jsonAbi = JSON.parse(abi);
    console.log(address);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}

// Aave pod bet instance
export function getAaavePodContract(web3, address) {
    const abi = '[{"inputs":[{"internalType":"uint256","name":"_minimumVal","type":"uint256"},{"internalType":"uint256","name":"_numOfStakers","type":"uint256"},{"internalType":"uint256","name":"timeStamp","type":"uint256"},{"internalType":"address","name":"_podManager","type":"address"},{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_aaveAddress","type":"address"},{"internalType":"string","name":"_betName","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_betId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interest","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"WinnerDeclare","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_betId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"WithDraw","type":"event"},{"inputs":[],"name":"aaveCore","outputs":[{"internalType":"contract AaveCoreInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aaveToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_betId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addStakeOnBet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"atoken","outputs":[{"internalType":"contract ATokenInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getBalanceofAaveToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getBalanceofRefularToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_betId","type":"uint256"}],"name":"redeemFromBetBeforeFinish","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"regularToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_betId","type":"uint256"}],"name":"winnerDeclareAndRefundStake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"winnerNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
    const jsonAbi = JSON.parse(abi);
    const contract = new web3.eth.Contract(jsonAbi, address);    
    return contract;
}

//KOvan Network
export const TokenInfoArray = [
    {
          'DAI': {
            "token_symbol":"DAI",
            "token_contract_address":"0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD",
            "decimals": 18
        },'BAT': {
            "token_symbol":"BAT",
            "token_contract_address":"0x2d12186fbb9f9a8c28b3ffdd4c42920f8539d738",
            "decimals": 18
        }
    }
];

  export const tagOptions = [
    {
        key: 'DAI-BAT',
        text: (
            <div className="token-pairs-overlap">
              <img src={DaiIcon} className="ui avatar image" alt="coin" />
              <img src={BatIcon} className="ui avatar image overlap-image" alt="coin" /> DAI - BAT
            </div>
          ),
        value: 'DAI-BAT',
    },{
        key: 'DAI-ZRX',
        text: (
            <div className="token-pairs-overlap">
              <img src={DaiIcon} className="ui avatar image" alt="coin" />
              <img src={ZrxIcon} className="ui avatar image  overlap-image" alt="coin" /> DAI - ZRX
            </div>
          ),
        value: 'DAI-ZRX',
    },{
        key: 'DAI-TRB',
        text: (
            <div className="token-pairs-overlap">
              <img src={DaiIcon} className="ui avatar image" alt="coin" />
              <img src={TrbIcon} className="ui avatar image  overlap-image" alt="coin" /> DAI - TRB
            </div>
          ),
        value: 'DAI-TRB',
    },
    // {
    //     key: 'DAI-WETH',
    //     text: (
    //         <div className="token-pairs-overlap">
    //           <img src={DaiIcon} className="ui avatar image" alt="coin" />
    //           <img src={EthIcon} className="ui avatar image overlap-image" alt="coin" /> DAI - WETH
    //         </div>
    //       ),
    //     value: 'DAI-WETH',
    // },
    // {
    //     key: 'TRB-WETH',
    //     text: (
    //         <div className="token-pairs-overlap">
    //           <img src={TrbIcon} className="ui avatar image" alt="coin" />
    //           <img src={EthIcon} className="ui avatar image  overlap-image" alt="coin" /> TRB - WETH
    //         </div>
    //       ),
    //     value: 'TRB-WETH',
    // },
    {
        key: 'ZRX-TRB',
        text: (
            <div className="token-pairs-overlap">
              <img src={ZrxIcon} className="ui avatar image" alt="coin" />
              <img src={TrbIcon} className="ui avatar image  overlap-image" alt="coin" /> ZRX - TRB
            </div>
          ),
        value: 'ZRX-TRB',
    }
    // ,{
    //     key: 'WETH-ZRX',
    //     text: (
    //         <div className="token-pairs-overlap">
    //           <img src={EthIcon} className="ui avatar image" alt="coin" />
    //           <img src={ZrxIcon} className="ui avatar image  overlap-image" alt="coin" /> WETH - ZRX
    //         </div>
    //       ),
    //     value: 'WETH-ZRX',
    // } 
  ];
  