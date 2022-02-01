import * as React from 'react';
import './Team.css';
import Field from './Field';
import PlayersTable from './PlayersTable';
import Stack from '@mui/material/Stack';

const Team = () => {
  return (
    <Stack
      justifyContent="space-evenly"
      alignItems="center"
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 5, md: 2 }}
      sx={{
        padding: '3vh 0'
      }}
    >
      <Field></Field>
      <PlayersTable></PlayersTable>
    </Stack>
  );
};

export default Team;
