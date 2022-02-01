import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  table: {},
  tableContainer: {
    borderRadius: 15,
    width: '50%',
    ['@media (max-width:900px)']: {
      width: '80%'
    },
    float: 'left',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.light)
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
  }
}));

let PLAYERS = [],
  STATUSES = ['Active', 'Pending', 'Blocked'];
for (let i = 0; i < 14; i++) {
  PLAYERS[i] = {
    name: 'mamdsmads',
    email: 'mamdsmads',
    phone: 'mamdsmads',
    jobTitle: 'mamdsmads',
    company: 'mamdsmads',
    joinDate: 'mamdsmads',
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
  };
}

function MTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
            <TableCell className={classes.tableHeaderCell}>
              User Info
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Job Info
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Joining Date
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {PLAYERS.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar
                      alt={row.name}
                      src="."
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>
                      {row.name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.email}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Typography color="primary" variant="subtitle2">
                  {row.jobTitle}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {row.company}
                </Typography>
              </TableCell>
              <TableCell>{row.joinDate}</TableCell>
              <TableCell>
                <Typography
                  className={classes.status}
                  style={{
                    backgroundColor:
                      (row.status === 'Active' && 'green') ||
                      (row.status === 'Pending' && 'blue') ||
                      (row.status === 'Blocked' && 'orange')
                  }}
                >
                  {row.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={PLAYERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MTable;
