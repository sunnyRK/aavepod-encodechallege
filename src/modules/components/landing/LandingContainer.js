import React, { Component } from 'react';

import MainTemplate from '../../shared/main-template/MainTemplateContainer';
import Landing from './Landing';
import web3 from '../../../../config/web3';

class LandingContainer extends Component {
  state = {
    isJoinDialogOpen: false,
    isRedeemDialogOpen: false,
    isDisburseDialogOpen: false,
    isCreateDialogOpen: false,
    isAdmin: false,
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0 && accounts[0] === '0x55E73A69B2315A6e7192af118705079Eb1dB2184') {
      this.handleState({ isAdmin: true });
    }
  }

  handleState = (state = {}) => {
    this.setState(state);
  }

  render() {
    return (
      <MainTemplate>
        <Landing
          handleState={this.handleState}
          isJoinDialogOpen={this.state.isJoinDialogOpen}
          isRedeemDialogOpen={this.state.isRedeemDialogOpen}
          isDisburseDialogOpen={this.state.isDisburseDialogOpen}
          isCreateDialogOpen={this.state.isCreateDialogOpen}
          isAdmin={this.state.isAdmin}
        />
      </MainTemplate>
    );
  }
}

export default LandingContainer;
