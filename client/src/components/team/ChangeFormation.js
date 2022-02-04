import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function AlertDialog(props) {
  const { formation, onFormationChange, open, setOpen } = props;

  const handleCloseAgree = () => {
    setOpen(false);
    onFormationChange(formation);
  };

  const handleCloseNotAgree = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseNotAgree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Change formation?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to change your formation? You could
          loose your progress editing...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseNotAgree} autoFocus>
          Keep
        </Button>
        <Button onClick={handleCloseAgree} variant="contained">
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  onFormationChange: PropTypes.func.isRequired,
  formation: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default AlertDialog;
