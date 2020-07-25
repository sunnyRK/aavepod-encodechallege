import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DisburseDialog from './DisburseDialog';

class DisburseDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDisburseClick = (event) => {
    event.preventDefault();
    this.props.handleState({ isDisburseDialogOpen: false });
  }

  render() {
    return (
      <Dialog
        className="custom-dialog custom-content-style join-dialog"
        open={this.props.openDialog}
      >
        <DialogTitle className="dialog-title">
          Disburse Last Pod Amounts
          <IconButton
            onClick={() => { this.props.handleState({ isDisburseDialogOpen: false }); }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content join-dialog">
          <DisburseDialog onDisburseClick={this.onDisburseClick} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default DisburseDialogContainer;
