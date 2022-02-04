import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import colors from '../../constants/colors';
import Logo from '../Logo';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const size = 70;
function Rounds() {
  const [rounds, setRounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // for now runs onComponentMount
  useEffect(() => {
    async function fetchStanding() {
      setRounds([]);
      setIsLoading(true);
      let response = await fetch('fantasy/round');
      response = await response.json();
      setRounds(response);
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

  const singleCard = (round, index) => (
    <Grid item xl={3} md={4} sm={6} xs={12} key={index}>
      <Card sx={{ minHeight: 275, backgroundColor: colors.beige }}>
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Typography color="sucess" gutterBottom variant="h5">
                {round.round_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Chip
                color={
                  round.status === 'Match Finished'
                    ? 'info'
                    : 'primary'
                }
                label={round.status}
              />
            </Grid>
          </Grid>
          <Grid container mt={2} padding="20px">
            <Grid item xs={6} justifyContent="center">
              <Avatar
                alt={round.home_team_object.name}
                src={round.home_team_object.logo}
                sx={{
                  width: size,
                  height: size,
                  margin: 'auto'
                }}
              />
            </Grid>
            <Grid item xs={6} justifyContent="center">
              <Avatar
                alt={round.away_team_object.name}
                src={round.away_team_object.logo}
                sx={{
                  width: size,
                  height: size,
                  margin: 'auto'
                }}
              />
            </Grid>
          </Grid>
          <Grid container sx={{ minHeight: '70px' }}>
            <Grid item xs={5} justifyContent="center">
              <Typography align="center" variant="h3">
                {round.goals_home}
              </Typography>
            </Grid>
            <Grid item xs={2} justifyContent="center">
              <Typography align="center" variant="h2">
                {round.status === 'Match Finished' ? '-' : ''}
              </Typography>
            </Grid>
            <Grid item xs={5} justifyContent="center">
              <Typography align="center" variant="h3">
                {round.goals_away}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            target="_blank"
            href={`https://www.google.com/search?q=${round.home_team_object.name}+vs+${round.away_team_object.name}`}
            color="info"
            size="small"
          >
            See more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Grid container spacing={5} sx={{ padding: '20px 40px' }}>
      {' '}
      {rounds.map(singleCard)}
    </Grid>
  );
}

export default Rounds;
