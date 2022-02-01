import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import {
  User,
  Player,
  Dt,
  Team,
  Venue,
  Standing
} from '../models/model.js';

const router = express.Router();
// Routes
// Test Route
router.get('/api', async (req, res) => {
  console.log('here');
  res.json({ message: 'Hello from server!' });
});

// router.post('/api/players', (req,res) => {
//   const player = new Player(req.body);
// })

router.get('/api/teams', async (req, res) => {
  const response = await fetch(
    'https://api-football-v1.p.rapidapi.com/v3/teams?league=262&season=2021',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key':
          'ae252d6cf6msh604371e6acd0647p1b313djsn032fff9f71e7'
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  response.response.forEach((team) => {
    const team_tmp = new Team({
      team_id: team.team.id,
      name: team.team.name,
      founded: team.team.founded,
      logo: team.team.logo,
      venue_id: team.venue.id
    });
    team_tmp.save();
  });

  res.json('success');
});

router.get('/api/venues', async (req, res) => {
  const response = await fetch(
    'https://api-football-v1.p.rapidapi.com/v3/teams?league=262&season=2021',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key':
          'ae252d6cf6msh604371e6acd0647p1b313djsn032fff9f71e7'
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  response.response.forEach((venue) => {
    const venue_tmp = new Venue({
      venue_id: venue.venue.id,
      name: venue.venue.name,
      address: venue.venue.address,
      city: venue.venue.city,
      capacity: venue.venue.capacity,
      image: venue.venue.image
    });
    venue_tmp.save();
  });

  res.json('success');
});

router.get('/api/standings', async (req, res) => {
  const response = await fetch(
    'https://api-football-v1.p.rapidapi.com/v3/standings?league=262&season=2021',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key':
          'ae252d6cf6msh604371e6acd0647p1b313djsn032fff9f71e7'
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  response.response[0].league.standings[0].forEach((standing) => {
    const standings_tmp = new Standing({
      rank: standing.rank,
      team_id: standing.team.id,
      points: standing.points,
      goals_diff: standing.goalsDiff,
      goals_for: standing.all.goals.for,
      goals_against: standing.all.goals.against,
      total_wins: standing.all.win,
      total_draws: standing.all.draw,
      total_losses: standing.all.lose
    });
    standings_tmp.save();
  });

  res.json('success');
});

router.get('/api/users_fantasy/', async (req, res) => {
  const user_tmp = new User({
    lineup: '4-3-3',
    budget: 5000000,
    team_lineup: {
      defense: ['1232'],
      midfield: ['1235'],
      attack: ['1234'],
      bench: ['1236'],
      dt: ['123']
    }
  });

  res.json('success');
});

router.get('/api/players', async (req, res) => {
  for (let i = 1; i <= 37; i++) {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?league=262&season=2021&page=${i}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key':
            'ae252d6cf6msh604371e6acd0647p1b313djsn032fff9f71e7'
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    response.response.forEach((pr) => {
      const player = new Player({
        player_id: pr.player.id,
        name: pr.player.name,
        age: pr.player.age,
        position: pr.statistics[0].games.position,
        photo: pr.player.photo,
        rating: pr.statistics[0].games.rating,
        team_id: pr.statistics[0].team.id,
        goals: pr.statistics[0].goals.total
      });
      player.save();
    });
  }

  res.json('success');
});

/** Login Route
 *  req.query:
 * {
 *  method: 'form' / 'google'
 *  email: email,
 *  password: password
 * }
 */
router.get('/login', async (req, res) => {
  const query = req.query;

  // As Google users don't need to register with their password,
  // we just need to lookup their email to see if they're
  // registered

  let user_filter = { email: query.email };
  if (query.method === 'form') {
    user_filter.password = query.password;
  }

  const user_is_registered = await User.findOne(user_filter);
  res.json({
    message: { userIsRegistered: !(user_is_registered === null) }
  });
});

/** Login Route
 *  req.body:
 * {
 *  email: 'email',
 *  password: 'password',
 *  name: 'name',
 *  teamName: 'team'
 * }
 */
router.post('/register', async (req, res) => {
  // Return early if user is already registered
  if ((await User.findOne({ email: req.body.email })) !== null) {
    res.json({
      message: { alreadyRegistered: true, registered: true }
    });
    return;
  }

  // Push new user to DB
  const new_user = new User(req.body);
  await new_user.save();
  res.json({
    message: { alreadyRegistered: false, registered: true }
  });
});

// All other GET requests not handled before will return our React app
//
// Leave this route after all defined routes and middleware
router.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/build', 'index.html')
  );
});

export { router };
