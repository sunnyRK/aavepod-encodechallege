import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import CreateDialog from './CreateDialog';

class CreateDialogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCreateClick = (event) => {
    event.preventDefault();
    this.props.handleState({ isCreateDialogOpen: false });
  }

  render() {
    return (
      <Dialog
        className="custom-dialog custom-content-style join-dialog"
        open={this.props.openDialog}
      >
        <DialogTitle className="dialog-title">
          Create Pod
          <IconButton
            onClick={() => { this.props.handleState({ isCreateDialogOpen: false }); }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content join-dialog">
          <CreateDialog onCreateClick={this.onCreateClick} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default CreateDialogContainer;
