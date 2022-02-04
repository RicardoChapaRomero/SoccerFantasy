import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import colors from '../../constants/colors';
import Logo from '../Logo';
import Stack from '@mui/material/Stack';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor: colors.beige
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function SaveTeamDialog(props) {
  const { onClose, success, open } = props;

  const logo = (
    <Logo
      size="100px"
      color={success ? colors.primaryGreen : colors.red}
    ></Logo>
  );
  const title = success
    ? 'Successful Team Update!'
    : 'Something went wrong';

  return (
    <BootstrapDialog onClose={onClose} open={open} fullWidth>
      <DialogContent>
        <Stack
          justifyContent="center"
          alignItems="center"
          mt={{ xl: 4, xs: 3 }}
          direction="column"
          spacing={4}
          fullWidth
          sx={{ minHeight: '300px' }}
        >
          {logo}
          {title}
        </Stack>
      </DialogContent>
    </BootstrapDialog>
  );
}

SaveTeamDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

export default SaveTeamDialog;
