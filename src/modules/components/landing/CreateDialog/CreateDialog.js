import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';

const CreateDialog = ({ onCreateClick }) => (
  <form onSubmit={onCreateClick} className="join-dialog-content">
    <div className="form-field">
      <TextField
        label="Pod Name"
        variant="outlined"
        fullWidth
        required
      />
    </div>
    <div className="form-field">
      <TextField
        label="Join Amount (in $)"
        variant="outlined"
        fullWidth
        required
      />
    </div>
    <div className="form-field">
      <TextField
        label="Total Days"
        variant="outlined"
        fullWidth
        required
      />
    </div>
    <div className="form-field join-dialog-footer">
      <Button
        className="join-submit-button"
        variant="outlined"
        type="submit"
      >
        Create
      </Button>
    </div>
  </form>
);

export default CreateDialog;
