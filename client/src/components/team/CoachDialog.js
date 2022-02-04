import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import colors from '../../constants/colors';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};
function CoachDialog(props) {
  const { onClose, selectedValue, setSelectedValue, open } = props;
  const [coaches, setCoaches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localDT, setLocalDT] = useState(selectedValue);

  useEffect(() => {
    async function fetchDTs() {
      setIsLoading(true);

      let response = await fetch('fantasy/dt');
      response = await response.json();
      setCoaches(response);
      setIsLoading(false);
    }

    fetchDTs();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (localDT) {
      setSelectedValue(localDT);
      onClose();
    }
  };

  const handleListItemClick = (coach) => {
    setLocalDT({
      name: coach.name,
      id: coach.dt_id,
      photo: coach.team_object.logo
    });
    console.log(coach);
  };
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`
  }));
  const singleCoach = (coach, index) => {
    return (
      <ListItem
        button
        onClick={() => handleListItemClick(coach)}
        key={coach}
        sx={{
          minWidth: '50px',
          backgroundColor:
            localDT.id === coach.dt_id ? colors.yellow : colors.white,
          '&:hover': {
            backgroundColor: colors.hoverYellow
          }
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              badgeContent={
                <SmallAvatar alt={coach.name} src={coach.photo} />
              }
            >
              <Avatar
                alt={coach.team_object.name}
                src={coach.team_object.logo}
              />
            </Badge>
          </Grid>

          <Grid item xs={3}>
            <ListItemText primary={coach.name} />
            <ListItemText secondary={coach.nationality} />
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open} fullWidth>
      <BootstrapDialogTitle onClose={handleClose}>
        Choose a Coach
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {coaches.map(singleCoach)}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="success"
          autoFocus
          onClick={handleSave}
          sx={{ margin: '10px' }}
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

CoachDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
  setSelectedValue: PropTypes.func.isRequired
};

export default CoachDialog;
