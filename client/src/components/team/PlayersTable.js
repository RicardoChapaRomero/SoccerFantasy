import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableFooter from '@mui/material/TableFooter';
import Avatar from '@mui/material/Avatar';
import colors from '../../constants/colors';
import Chip from '@mui/material/Chip';
import PlayersTableBar from './PlayersTableBar';
import PropTypes from 'prop-types';
import { getColor } from '../../constants/positions';
import Logo from '../Logo';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  table: {
    whiteSpace: 'wrap',
    overflow: 'auto',
    backgroundColor: colors.white
  },
  tableContainer: {
    width: '55vw',
    maxHeight: 'calc(94vh - 144px)',
    ['@media (max-width:900px)']: {
      width: '95vw'
    }
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: colors.beige,
    color: colors.black
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: '5px',
    width: 35,
    height: 35
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  }
}));

const defaultPrice = 1000000,
  defaultPoint = 0;
const COLUMNS = ['Player', 'Position', 'Team', 'Price', 'Points', 'Status'];

function MTable(props) {
  const { formation, setFormation, selected_players, setSelectedPlayers } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('All');
  const [searchText, setSearchText] = useState('');

  const formation_size = {
    Goalkeeper: 1,
    Defender: Number.parseInt(formation[0]),
    Midfielder: Number.parseInt(formation[2]),
    Attacker: Number.parseInt(formation[4])
  };

  const handleSearchTextChange = (s) => {
    setSearchText(s);
    setPage(0);
  };
  const handleSetPosition = (p) => {
    setPosition(p);
    setPage(0);
  };

  useEffect(() => {
    async function fetchPlayers() {
      setPlayers([]);
      setIsLoading(true);

      let response = await fetch(
        `fantasy/players?pageRows=${rowsPerPage}&page=${page}&position=${position}&searchText=${searchText}`
      );
      response = await response.json();
      setPlayers(response);
      setIsLoading(false);
    }

    fetchPlayers();
  }, [page, position, rowsPerPage, searchText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const addPlayerEvent = (player) => {
    const position = player.position;
    if (selected_players[position].length < formation_size[position]) {
      selected_players[position].push({
        id: player.player_id,
        name: player.name,
        img: player.photo,
        position: position
      });
      setSelectedPlayers({...selected_players});
    }
  };

  const deletePlayerEvent = (position, player) => {
    selected_players[position].splice(player, 1);
    setSelectedPlayers({...selected_players});
  }

  const tableContent = isLoading ? null : (
    <>
      <TableBody>
        {players.map((row) => (
          <TableRow key={row.name}>
            <TableCell>
              <Grid container>
                <Grid item lg={2}>
                  <Avatar
                    alt={row.name}
                    src={row.photo}
                    className={classes.avatar}
                  />
                </Grid>
                <Grid item lg={6}>
                  <Typography className={classes.name}>
                    {row.name}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {'Age: ' + row.age}
                  </Typography>
                  {row.goals && (
                    <Typography color="textSecondary" variant="body2">
                      {'Goals: ' + row.goals}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              <Chip
                color={getColor(row.position)}
                label={row.position}
              />
            </TableCell>
            <TableCell>
              <Avatar
                alt={row.team_object.name}
                src={row.team_object.logo}
                className={classes.avatar}
              />
            </TableCell>
            <TableCell>{defaultPrice}</TableCell>
            <TableCell>{defaultPoint}</TableCell>
            <TableCell>
              <Button
                variant='contained'
                color={
                  selected_players[row.position].map((p) => {return p.id})
                    .indexOf(row.player_id) === -1 ? 'success' : 'error'}
                onClick={() => {
                  const player_index = selected_players[row.position]
                  .map((p) => {return p.id}).indexOf(row.player_id);
                  player_index === -1 ? addPlayerEvent(row) : deletePlayerEvent(row.position, player_index);
                }}>
                {selected_players[row.position].map((p) => {return p.id})
                  .indexOf(row.player_id) === -1 ? 'Add' : 'Remove'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="span"
          count={players.length < rowsPerPage ? players.length : -1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableFooter>
    </>
  );

  return (
    <div>
      <PlayersTableBar
        formation={formation}
        setFormation={setFormation}
        position={position}
        setPosition={handleSetPosition}
        setSearchText={handleSearchTextChange}
        searchText={searchText}
      ></PlayersTableBar>

      <TableContainer className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell className={classes.tableHeaderCell}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {tableContent}
        </Table>
      </TableContainer>
      {isLoading && (
        <Stack
          spacing={1}
          mt={3}
          alignItems="center"
          direction="column"
        >
          <Logo size={200} loader={true} />
          <h2 style={{ color: colors.darkGray }}>Loading... </h2>
        </Stack>
      )}
    </div>
  );
}

MTable.propTypes = {
  setFormation: PropTypes.func,
  formation: PropTypes.string,
  selected_players: PropTypes.object,
  setSelectedPlayers: PropTypes.func
};
MTable.defaultProps = {
  setFormation: () => console.log('formation callback default'),
  formation: '4-3-3'
};

export default MTable;
