import React, { useState } from 'react';
import './Team.css';
import Field from './Field';
import PlayersTable from './PlayersTable';
import Stack from '@mui/material/Stack';

const Team = () => {
  const [formation, setFormation] = useState('4-3-3');
  const [selected_players, setSelectedPlayers] = useState({
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: [],
    Dt: { id: -1, name: '', photo: '' }
  });

  const handleDTChange = (coach) => {
    const stateCopy = selected_players;
    setSelectedPlayers({ ...stateCopy, Dt: coach });
  };

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
      <Field
        formation={formation}
        selected_players={selected_players}
        setSelectedDT={handleDTChange}
      ></Field>
      <PlayersTable
        formation={formation}
        setFormation={setFormation}
        selected_players={selected_players}
        setSelectedPlayers={(selected_players) =>
          setSelectedPlayers(selected_players)
        }
      ></PlayersTable>
    </Stack>
  );
};

export default Team;
