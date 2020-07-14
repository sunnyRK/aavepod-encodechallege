import React, { Component } from 'react';
import web3 from '../config/web3';

class Index extends Component { 

    async componentDidMount() {
        let networkType;
        await web3.eth.net.getNetworkType().then(function(type) {
          networkType = type
        });
        console.log(networkType);
        if(networkType != "kovan") {
          alert("Network Error: Change network " + networkType + " to kovan");
          this.setState({
            displayMessage: "Network Error: Change network " + networkType + " to kovan",
          });
        } else {
          this.setState({
            displayMessage: '',
          });
        }
        this.enablewindow();
      }
    
      async enablewindow() {
        await window.ethereum.enable();
      }
    

  render() {
      return(
        <div>Hello World</div>
      );
  }
}
export default Index;
