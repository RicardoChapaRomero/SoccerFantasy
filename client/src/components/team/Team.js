import React, { useState } from 'react';
import './Team.css';
import Field from './Field';
import PlayersTable from './PlayersTable';
import Stack from '@mui/material/Stack';

const Team = () => {
  const [formation, setFormation] = useState('4-3-3');

  return (
    <Stack
      justifyContent={{ xs: 'center', md: 'space-evenly' }}
      alignItems={{ xs: 'center', md: 'flex-start' }}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 5, md: 2 }}
      sx={{
        padding: '2vh 0'
      }}
    >
      <Field formation={formation}></Field>
      <PlayersTable
        formation={formation}
        setFormation={setFormation}
      ></PlayersTable>
    </Stack>
  );
};

export default Team;
