import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
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
import colors from '../../colors';
import Chip from '@mui/material/Chip';

const useStyles = makeStyles((theme) => ({
  table: {
    whiteSpace: 'wrap',
    overflow: 'auto',
    backgroundColor: colors.white
  },
  tableContainer: {
    maxWidth: '50vw',
    ['@media (max-width:900px)']: {
      maxWidth: '90vw'
    }
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: colors.beige,
    color: colors.black
  },
  avatar: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    marginRight: '5px'
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  },
  searchBar: {
    display: 'flex',
    width: '100%',
    heigth: '300px',
    backgroundColor: colors.beige
  }
}));

const defaultPrice = 1000000,
  defaultPoint = 0;
const COLUMNS = ['Player', 'Team', 'Price', 'Points'];

const initPlayers = (setPlayers) => {
  let players = [];
  for (let i = 0; i < 14; i++) {
    players[i] = {
      name: 'M. Araújo',
      age: 22,
      position: 'Midfielder',
      photo: 'https://media.api-sports.io/football/players/51776.png',
      rating: '6.866666',
      team_id: '2291',
      goals: 2
    };
  }
  setPlayers(players);
};

const getColor = (position) => {
  if (position === 'Goalkeeper') {
    return 'error';
  }
  if (position === 'Defender') {
    return 'info';
  }
  if (position === 'Attacker') {
    return 'secondary';
  }

  return 'primary';
};

function MTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [players, setPlayers] = useState([]);

  // for now runs onComponentMount
  useEffect(() => {
    initPlayers(setPlayers);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContainer}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableCell className={classes.tableHeaderCell}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players
            .slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            .map((row) => (
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
                    <Grid item lg={10}>
                      <Typography ml={1} className={classes.name}>
                        {row.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                        ml={1}
                        mb={1}
                      >
                        {'Age: ' + row.age}
                      </Typography>
                      <Chip
                        color={getColor(row.position)}
                        label={row.position}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="body2">
                    {row.team_id}
                  </Typography>
                </TableCell>
                <TableCell>{defaultPrice}</TableCell>
                <TableCell>{defaultPoint}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="span"
            count={players.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTable;
