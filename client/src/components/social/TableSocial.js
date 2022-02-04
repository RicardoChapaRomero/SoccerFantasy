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
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Stack from '@mui/material/Stack';

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
    backgroundColor: colors.darkGray,
    color: colors.beige
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

const COLUMNS = ['User', 'Points', 'Budget', 'Formation'];

function SocialTable(props) {
  const {
    selectedUserIndex,
    setSelectedUserIndex,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    users,
    isLoading
  } = props;
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const onRowClick = (row, index) => {
    setSelectedUserIndex(index);
  };

  const tableContent = isLoading ? null : (
    <>
      <TableBody>
        {users.map((row, i) => (
          <TableRow
            onClick={() => onRowClick(row, i)}
            key={row.name}
            sx={{
              backgroundColor:
                i === selectedUserIndex
                  ? colors.beigeTwo
                  : colors.beige,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: colors.beigeTwo
              }
            }}
          >
            <TableCell>
              <Grid container>
                <Grid item lg={2}>
                  <Avatar
                    alt={row.user_id.name}
                    className={classes.avatar}
                  >
                    {row.user_id.name[0]}
                  </Avatar>
                </Grid>
                <Grid item lg={6}>
                  <Typography className={classes.name}>
                    {row.user_id.name}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    {row.user_id.teamName}
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{row.fantasy_points}</TableCell>
            <TableCell>{row.budget}</TableCell>
            <TableCell>{row.lineup}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="span"
          count={users.length < rowsPerPage ? users.length : -1}
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

SocialTable.propTypes = {
  selected_players: PropTypes.object,
  setSelectedPlayers: PropTypes.func.isRequired,
  selectedUserIndex: PropTypes.number.isRequired,
  setSelectedUserIndex: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SocialTable;
