import * as React from 'react';
import PropTypes from 'prop-types';
import './Field.css';
import Box from '@mui/material/Box';

const Field = (props) => {
  const { players } = props;
  return (
    <div className="field">
      <Box
        noWrap
        sx={{
          display: 'flex',
          height: '20%'
        }}
      ></Box>
      <Box
        noWrap
        sx={{
          display: { xs: 'none', md: 'flex' }
        }}
      ></Box>
      <Box
        noWrap
        sx={{
          display: { xs: 'none', md: 'flex' }
        }}
      ></Box>
    </div>
  );
};
Field.propTypes = {
  players: PropTypes.array,
  formation: PropTypes.array
};
Field.defaultProps = {
  players: [],
  formation: [4, 3, 3]
};
export default Field;
