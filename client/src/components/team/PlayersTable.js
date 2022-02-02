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

const useStyles = makeStyles((theme) => ({
  table: {
    whiteSpace: 'wrap',
    overflow: 'auto',
    backgroundColor: colors.white
  },
  tableContainer: {
    maxWidth: '55vw',
    maxHeight: 'calc(94vh - 144px)',
    ['@media (max-width:900px)']: {
      maxWidth: '95vw'
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
  }
}));

const defaultPrice = 1000000,
  defaultPoint = 0;
const COLUMNS = ['Player', 'Position', 'Team', 'Price', 'Points'];

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

function MTable(props) {
  const { formation, setFormation } = props;
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
    <div>
      <PlayersTableBar
        formation={formation}
        setFormation={setFormation}
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
                      <Grid item lg={4}>
                        <Typography className={classes.name}>
                          {row.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          {'Age: ' + row.age}
                        </Typography>
                        {row.goals && (
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
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
    </div>
  );
}

MTable.propTypes = {
  setFormation: PropTypes.func,
  formation: PropTypes.string
};
MTable.defaultProps = {
  setFormation: () => console.log('formation callback default'),
  formation: '4-3-3'
};

export default MTable;
