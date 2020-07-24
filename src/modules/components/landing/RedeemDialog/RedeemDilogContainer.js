import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import RedeemDialog from './ReedemDialog';

class RedeemDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onConfirmClick = () => {
    this.props.handleState({ isRedeemDialogOpen: false });
  }

  onCancelClick = () => {
    this.props.handleState({ isRedeemDialogOpen: false });
  }

  render() {
    return (
      <Dialog
        className="custom-dialog custom-content-style redeem-dialog"
        open={this.props.openDialog}
      >
        <DialogTitle className="dialog-title">
          Join
          <IconButton
            onClick={() => { this.props.handleState({ isRedeemDialogOpen: false }); }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content redeem-dialog">
          <RedeemDialog
            onConfirmClick={this.onConfirmClick}
            onCancelClick={this.onCancelClick}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default RedeemDialogContainer;
