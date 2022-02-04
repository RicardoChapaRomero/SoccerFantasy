import React, { useEffect, useState } from 'react';
import './Social.css';
import SocialField from './SocialField';
import TableSocial from './TableSocial';
import Stack from '@mui/material/Stack';
import { getPlayers } from '../../scripts/apiScripts';

const Social = () => {
  const [formation, setFormation] = useState('4-3-3');
  const [selected_players, setSelectedPlayers] = useState({
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: [],
    Dt: { id: -1, name: '', photo: '' }
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);

  useEffect(() => {
    async function fetchFantasyUsers() {
      setUsers([]);
      setIsLoading(true);

      let response = await fetch(
        `fantasy/fantasies?pageRows=${rowsPerPage}&page=${page}`
      );
      response = await response.json();
      setUsers(response);
      console.log(response);
      if (response.length > 0) setSelectedUserIndex(0);
      if (response) setIsLoading(false);
    }

    fetchFantasyUsers();
  }, [page, rowsPerPage]);

  useEffect(() => {
    async function updatePlayers() {
      if (selectedUserIndex > -1) {
        // get players from first team
        const lineup = users[selectedUserIndex].team_lineup;

        const players = lineup.attack.concat(
          lineup.defense,
          lineup.midfield
        );

        if (lineup.goalkeeper.length) players.push(lineup.goalkeeper);

        const players_res = await getPlayers(players);
        players_res.team.Dt =
          lineup.dt.id !== -1
            ? lineup.dt
            : { id: -1, name: '', photo: '' };
        console.log(players_res);

        setFormation(users[selectedUserIndex].lineup);
        setSelectedPlayers(players_res.team);
      }
    }
    updatePlayers();
  }, [selectedUserIndex]);

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
      <SocialField
        formation={formation}
        selected_players={selected_players}
        setSelectedDT={() => console.log('notNecesary')}
      />
      <TableSocial
        selectedUserIndex={selectedUserIndex}
        setSelectedUserIndex={setSelectedUserIndex}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        users={users}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default Social;
