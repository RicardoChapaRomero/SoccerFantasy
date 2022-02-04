import React, { useEffect, useState } from 'react';
import './Team.css';
import Field from './Field';
import PlayersTable from './PlayersTable';
import Stack from '@mui/material/Stack';
import {
  verifyUserToken,
  getFantasy,
  getPlayers
} from '../../scripts/apiScripts';

const initialState = {
  Goalkeeper: [],
  Defender: [],
  Midfielder: [],
  Attacker: [],
  Dt: { id: -1, name: '', photo: '' }
};
const Team = () => {
  const [formation, setFormation] = useState('4-3-3');
  const [selected_players, setSelectedPlayers] =
    useState(initialState);

  const onFormationChange = (form) => {
    if (formation !== form) {
      setSelectedPlayers(initialState);
      setFormation(form);
    }
  };

  const handleDTChange = (coach) => {
    const stateCopy = selected_players;
    setSelectedPlayers({ ...stateCopy, Dt: coach });
  };

  useEffect(() => {
    async function getUserFantasy() {
      const token_res = await verifyUserToken(document.cookie);
      const fantasy_team = await getFantasy(token_res.userId);

      const lineup = fantasy_team.team.team_lineup;
      const players = lineup.attack.concat(
        lineup.defense,
        lineup.midfield
      );

      if (lineup.goalkeeper.length) players.push(lineup.goalkeeper);

      const players_res = await getPlayers(players);
      players_res.team.Dt =
        fantasy_team.team.team_lineup.dt.id !== -1
          ? fantasy_team.team.team_lineup.dt
          : { id: -1, name: '', photo: '' };

      setFormation(fantasy_team.team.lineup);
      setSelectedPlayers(players_res.team);
    }

    getUserFantasy();
  }, []);

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
        onFormationChange={onFormationChange}
        selected_players={selected_players}
        setSelectedPlayers={(selected_players) =>
          setSelectedPlayers(selected_players)
        }
        emptyTeam={false}
      ></PlayersTable>
    </Stack>
  );
};

export default Team;
