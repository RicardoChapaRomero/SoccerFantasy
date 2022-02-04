import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import colors from '../../constants/colors';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getColor } from '../../constants/positions';
import { stringAvatar, size } from '../../constants/avatars';
import CoachDialog from './CoachDialog';
import Tooltip from '@mui/material/Tooltip';

const Coach = (props) => {
  const { selectedValue, setSelectedValue } = props;
  const { name, photo, id } = selectedValue;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // default render

  const CoachAvatar =
    name === '' && photo === '' ? (
      <Avatar
        sx={{
          bgcolor: colors.darkGray,
          width: size,
          height: size
        }}
      ></Avatar>
    ) : photo === '' || photo == null ? (
      <Avatar {...stringAvatar(name, size)} />
    ) : (
      <Avatar
        alt={name}
        src={photo}
        sx={{ wiCoachh: size, height: size }}
      />
    );
  const CoachChip =
    name !== '' ? (
      <Chip color={getColor('Coach')} label={name} />
    ) : null;
  return (
    <>
      <Tooltip
        title={id === -1 ? 'Add a coach!' : 'Edit your coach'}
        placement="top"
        onClick={handleClickOpen}
      >
        <Stack
          direction="column"
          spacing={{ md: 2, xs: 1 }}
          justifyContent="center"
          alignItems="center"
          sx={{
            position: 'absolute',
            bottom: '15px',
            right: '15px',
            cursor: 'pointer'
          }}
        >
          {CoachAvatar}
          {CoachChip}
        </Stack>
      </Tooltip>
      <CoachDialog
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
};

Coach.defaultProps = {
  selectedValue: PropTypes.object.isRequired,
  setSelectedValue: PropTypes.func.isRequired
};
export default Coach;
