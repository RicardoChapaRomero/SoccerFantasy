import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import mau from './mau.jpeg';
import mig from './mig.jpeg';
import ric from './ric.jpeg';
import colors from '../../constants/colors';

const personas = [
  {
    name: 'Mauricio Juarez',
    photo: mau,
    description: 'Developer',
    github: 'http://github.com/zJuarez',
    linkedin: 'https://www.linkedin.com/in/mauricio-juarez/'
  },
  {
    name: 'Miguel Elizondo',
    photo: mig,
    description: 'Developer',
    github: 'http://github.com/miguelelizondov',
    linkedin: 'https://www.linkedin.com/in/miguelelizondov/'
  },
  {
    name: 'Ricardo Chapa',
    photo: ric,
    description: 'Developer',
    github: 'https://github.com/RicardoChapaRomero',
    linkedin:
      'https://www.linkedin.com/in/ricardo-chapa-romero-a4b277133/'
  }
];

function ImgMediaCard(person, index) {
  return (
    <Grid item md={4} xs={12} key={index}>
      <Card
        sx={{
          margin: 'auto',
          backgroundColor: colors.beige
        }}
      >
        <CardMedia
          component="img"
          alt={person.name}
          height="280"
          image={person.photo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            href={person.github}
            target="_blank"
            color="secondary"
            aria-label="github"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href={person.linkedin}
            target="_blank"
            color="secondary"
            aria-label="linkedin"
          >
            <LinkedInIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

function About() {
  return (
    <Grid container spacing={2} sx={{ padding: '40px 40px' }}>
      {personas.map(ImgMediaCard)}
      <div
        style={{
          width: '100%',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          target="_blank"
          href="https://github.com/RicardoChapaRomero/SoccerFantasy"
        >
          See code
        </Button>
      </div>
    </Grid>
  );
}

export default About;
