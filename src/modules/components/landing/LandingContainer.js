import React, { Component } from 'react';

import MainTemplate from '../../shared/main-template/MainTemplateContainer';
import Landing from './Landing';

class LandingContainer extends Component {
  state = {
    isJoinDialogOpen: false,
  };

  onJoinClick = () => {
    this.setState({ isJoinDialogOpen: true });
  }

  handleState = (state = {}) => {
    this.setState(state);
  }

  render() {
    return (
      <MainTemplate>
        <Landing
          isJoinDialogOpen={this.state.isJoinDialogOpen}
          onJoinClick={this.onJoinClick}
          handleState={this.handleState}
        />
      </MainTemplate>
    );
  }
}

export default LandingContainer;
