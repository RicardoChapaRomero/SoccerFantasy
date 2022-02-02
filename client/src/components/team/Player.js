import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import colors from '../../constants/colors';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getColor } from '../../constants/positions';
import { stringAvatar, size } from '../../constants/avatars';

const Player = (props) => {
  const { playerName, playerPhoto, position } = props;
  // default render
  if (playerName === '' && playerPhoto === '') {
    return (
      <Tooltip title="Add a player!" placement="top">
        <Avatar
          sx={{
            bgcolor: colors.darkGray,
            width: size,
            height: size
          }}
        ></Avatar>
      </Tooltip>
    );
  }

  const playerAvatar =
    playerPhoto === '' || playerPhoto == null ? (
      <Avatar {...stringAvatar(playerName, size)} />
    ) : (
      <Avatar
        alt={playerName}
        src={playerPhoto}
        sx={{ width: size, height: size }}
      />
    );
  return (
    <Stack
      direction="column"
      spacing={{ md: 2, xs: 1 }}
      justifyContent="center"
      alignItems="center"
    >
      {playerAvatar}
      <Chip color={getColor(position)} label={playerName} />
    </Stack>
  );
};
Player.propTypes = {
  playerName: PropTypes.string,
  playerPhoto: PropTypes.string,
  position: PropTypes.string
};
Player.defaultProps = {
  playerName: '',
  playerPhoto: ''
};
export default Player;
