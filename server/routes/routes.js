import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import {
  User,
  Player,
  Dt,
  Team,
  Venue,
  Standing,
  Round
} from '../models/model.js';

const pointsFormat = {
  minutes: 0.01,
  shots: 3,
  goals: {
    total: 30,
    conceded: -20,
    assists: 10,
    saves: 5
  },
  passes: 0.5,
  tackles: {
    blocks: 10,
    interceptions: 10
  },
  dribbles: 10,
  cards: {
    yellow: -15,
    red: -30
  }
};
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
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
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
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
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
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
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

router.get('/api/fixtures/back', async (req, res) => {
  const response_back = await fetch(
    'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=262&season=2021&timezone=America/Mexico_City&last=9',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  response_back.response.forEach((round) => {
    const round_tmp = new Round({
      round_id: round.fixture.id,
      round_name: round.league.round,
      referee: round.referee,
      date: round.date,
      venue_id: round.fixture.venue.id,
      status: round.fixture.status.long,
      home_team_id: round.teams.home.id,
      away_team_id: round.teams.away.id,
      goals_home: round.goals.home,
      goals_away: round.goals.away
    });
    round_tmp.save();
  });

  res.json('success');
});

router.get('/api/fixtures/front', async (req, res) => {
  const response_back = await fetch(
    'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=262&season=2021&timezone=America/Mexico_City&next=9',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  response_back.response.forEach((round) => {
    const round_tmp = new Round({
      round_id: round.fixture.id,
      round_name: round.league.round,
      referee: round.referee,
      date: round.date,
      venue_id: round.fixture.venue.id,
      status: round.fixture.status.long,
      home_team_id: round.teams.home.id,
      away_team_id: round.teams.away.id,
      goals_home: round.goals.home,
      goals_away: round.goals.away
    });
    round_tmp.save();
  });
  res.json('success');
});

router.get('/api/users_fantasy/', async (req, res) => {
  const user_tmp = new User({
    lineup: '4-3-3',
    budget: 5000000,
    team_lineup: {
      goalkeeper: '1237',
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
  for (let i = 1; i <= 1; i++) {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?league=262&season=2021&page=${i}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY
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
        goals: pr.statistics[0].goals.total,
        points: 0
      });
      player.save();
    });
  }

  res.json('success');
});

router.get('/api/calculatePoints', async (req, res) => {
  let points_tmp = 0;
  let x = true;
  let tmp = 0;
  Round.find({ status: 'Match Finished' }, async (err, docs) => {
    docs.forEach(async (round) => {
      const response = await fetch(
        `https://api-football-v1.p.rapidapi.com/v3/fixtures/players?fixture=${round.round_id}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
          }
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });

      response.response.forEach(async (team) => {
        team.players.forEach(async (player) => {
          points_tmp +=
            pointsFormat.minutes *
              player.statistics[0].games.minutes +
            pointsFormat.shots * player.statistics[0].shots.on +
            pointsFormat.goals.total *
              player.statistics[0].goals.total +
            pointsFormat.goals.conceded *
              player.statistics[0].goals.conceded +
            pointsFormat.goals.assists *
              player.statistics[0].goals.assists +
            pointsFormat.goals.saves *
              player.statistics[0].goals.saves +
            pointsFormat.passes *
              parseInt(player.statistics[0].passes.accuracy) +
            pointsFormat.tackles.blocks *
              player.statistics[0].tackles.blocks +
            pointsFormat.tackles.interceptions *
              player.statistics[0].tackles.interceptions +
            pointsFormat.dribbles *
              player.statistics[0].dribbles.success +
            pointsFormat.cards.yellow *
              player.statistics[0].cards.yellow +
            pointsFormat.cards.red * player.statistics[0].cards.red;
          Player.findOneAndUpdate(
            { player_id: player.player.id },
            { points: points_tmp },
            (res) => {
              //console.log('Updated points');
            }
          );
          console.log(
            'player id: ',
            player.player.id,
            'player name: ',
            player.player.name,
            ' Points: ',
            points_tmp,
            'player: ',
            tmp
          );
          points_tmp = 0;
          tmp += 1;
        });
      });
      console.log('players: ', tmp);
    });
  });
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
  console.log(req.query)
  const user_is_registered = await User.findOne(user_filter);

  /**
   * 
   *   const user_is_registered = await User.findOne(user_filter, (err, user) => {
    if (err) {
      return null;
    } else {
      console.log(user)
      return query.method === 'form' ? 
        bcrypt.compareSync(query.password, user.password) : 
        true; 
    }
  });
   */

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

  const salt = bcrypt.genSaltSync(12);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

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
const __dirname = path.resolve();
router.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/build', 'index.html')
  );
});

export { router };
