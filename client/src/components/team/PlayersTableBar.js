import React, { useState, useEffect } from 'react';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150
    }
  }
};
function MBar(props) {
  const { formation, setFormation } = props;
  const [positionsFilters, setPositionsFilter] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPositionsFilter(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const formationDropdown = (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Formation
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formation}
          label="Formation"
          onChange={(e) => setFormation(e.target.value)}
        >
          {formations.map((f) => (
            <MenuItem value={f}>{f}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const positionFilterSelect = (
    <FormControl sx={{ minWidth: '100px', maxWidth: '300px' }}>
      <InputLabel id="demo-multiple-chip-label">Position</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={positionsFilters}
        onChange={handleChange}
        input={
          <OutlinedInput id="select-multiple-chip" label="Chip" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                color={getColor(value)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {positions.map((pos) => (
          <MenuItem key={pos} value={pos}>
            {pos}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const saveButton = (
    <Button onClick={() => alert('Saving team')} variant="contained">
      save team
    </Button>
  );

  return (
    <div id="box">
      {formationDropdown} {positionFilterSelect} {saveButton}
    </div>
  );
}

MBar.propTypes = {
  setFormation: PropTypes.func,
  formation: PropTypes.string
};
MBar.defaultProps = {
  setFormation: () => console.log('formation callback default'),
  formation: '4-3-3'
};

export default MBar;
