import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import colors from '../../constants/colors';
import Logo from '../Logo';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  table: {
    whiteSpace: 'wrap',
    overflow: 'auto',
    backgroundColor: colors.white
  },
  tableContainer: {
    width: '90vw'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: colors.darkGray,
    color: colors.white
  },
  avatar: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 5
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  }
}));

const COLUMNS = ['Team', 'GP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'P'];

/*
MODEL STANDING
{
            "_id": "61f885bf9d75674543ab0c52",
            "rank": 3,
            "team_id": "2283",
            "points": 7,
            "goals_diff": 3,
            "goals_for": 4,
            "goals_against": 1,
            "total_wins": 2,
            "total_draws": 1,
            "total_losses": 0,
            "__v": 0,
             "team_object": {
              "_id": "61f87e2ff9a3d10450799e38",
              "team_id": "2283",
              "name": "Atlas",
              "founded": 1916,
              "logo": "https://media.api-sports.io/football/teams/2283.png",
              "venue_id": "1071",
              "__v": 0
        }
        }
*/
function Standings(props) {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  // for now runs onComponentMount
  useEffect(() => {
    async function fetchStanding() {
      setIsLoading(true);

      let response = await fetch('fantasy/standing');
      response = await response.json();
      setTeams(response);
      setIsLoading(false);
    }

    fetchStanding();
  }, []);

  if (isLoading) {
    return (
      <>
        <Logo size={200} loader={true} />
        <h2 style={{ color: colors.darkGray }}>Loading... </h2>
      </>
    );
  }
  return (
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
          {teams.map((row, i) => (
            <TableRow
              key={row.team_id}
              sx={{
                backgroundColor:
                  i < 4
                    ? colors.beigeTwo
                    : i < 12
                    ? colors.beige
                    : colors.white
              }}
            >
              <TableCell>
                <Grid container>
                  <Grid item lg={1}>
                    <Typography className={classes.name}>
                      {row.rank}
                    </Typography>
                  </Grid>
                  <Grid item lg={1}>
                    <Avatar
                      alt={row.team_object.name}
                      src={row.team_object.logo}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <Typography>{row.team_object.name}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                {row.total_draws + row.total_losses + row.total_wins}
              </TableCell>
              <TableCell>{row.total_wins}</TableCell>
              <TableCell>{row.total_draws}</TableCell>
              <TableCell>{row.total_losses}</TableCell>
              <TableCell>{row.goals_for}</TableCell>
              <TableCell>{row.goals_against}</TableCell>
              <TableCell>{row.goals_diff}</TableCell>
              <TableCell>{row.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Standings;
