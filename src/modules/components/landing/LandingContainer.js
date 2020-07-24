import React, { Component } from 'react';

import MainTemplate from '../../shared/main-template/MainTemplateContainer';
import Landing from './Landing';

class LandingContainer extends Component {
  state = {
    isJoinDialogOpen: false,
    isRedeemDialogOpen: false,
    isDisburseDialogOpen: false,
  };

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
        />
      </MainTemplate>
    );
  }
}

export default LandingContainer;
