import React, { useState } from 'react';
import formations from '../../constants/formations';
import { positions, getColor } from '../../constants/positions';

import Chip from '@mui/material/Chip';
import './PlayersTableBar.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import colors from '../../constants/colors';

const ALL_FORMATIONS = 'All';

function MBar(props) {
  const { formation, setFormation, position, setPosition } = props;

  const formationDropdown = (
    <Box sx={{ minWidth: 100 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel
          style={{ fontWeight: 'bold', color: colors.black }}
          id="demo-simple-select-label"
        >
          Formation
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formation}
          label="Formation"
          onChange={(e) => setFormation(e.target.value)}
          renderValue={() => (
            <Box sx={{ padding: '4px 0px 5px 0px' }}>{formation}</Box>
          )}
        >
          {formations.map((f) => (
            <MenuItem value={f}>{f}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
  const positionSelect = (
    <Box sx={{ minWidth: 100 }}>
      <FormControl variant="standard" fullWidth>
        <InputLabel
          style={{ fontWeight: 'bold', color: colors.black }}
          id="demo-multiple-chip-label"
        >
          Position
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
          renderValue={() => {
            if (position === ALL_FORMATIONS) {
              return (
                <Box sx={{ padding: '4px 0px 5px 0px' }}>
                  {position}
                </Box>
              );
            }
            return (
              <Chip
                key={position}
                label={position}
                color={getColor(position)}
              />
            );
          }}
        >
          <MenuItem key={0} value={ALL_FORMATIONS}>
            {ALL_FORMATIONS}
          </MenuItem>
          {positions.map((pos) => (
            <MenuItem key={pos} value={pos}>
              {pos}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const saveButton = (
    <Button
      sx={{ display: 'flex', alignSelf: 'center' }}
      onClick={() => alert('Saving team')}
      variant="contained"
    >
      save team
    </Button>
  );

  const dtDropdown = <div></div>;

  return (
    <div id="box">
      {formationDropdown} {positionSelect}
      {dtDropdown} {saveButton}
    </div>
  );
}

MBar.propTypes = {
  setFormation: PropTypes.func,
  formation: PropTypes.string,
  setPosition: PropTypes.func,
  position: PropTypes.string
};
MBar.defaultProps = {
  setFormation: () => console.log('formation callback default'),
  formation: '4-3-3',
  setPosition: () => console.log('position callback default'),
  position: ALL_FORMATIONS
};

export default MBar;
