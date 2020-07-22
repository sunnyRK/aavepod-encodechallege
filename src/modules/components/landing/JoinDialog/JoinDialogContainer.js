import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import JoinDialog from './JoinDialog';

class JoinDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onJoinClick = () => {
    this.props.handleState({ isJoinDialogOpen: false });
  }

  render() {
    return (
      <Dialog
        className="custom-dialog custom-content-style join-dialog"
        open={this.props.openDialog}
      >
        <DialogTitle className="dialog-title">
          Join
          <IconButton
            onClick={() => { this.props.handleState({ isJoinDialogOpen: false }); }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content join-dialog">
          <JoinDialog onJoinClick={this.onJoinClick} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default JoinDialogContainer;
