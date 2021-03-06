import express from 'express';
import fetch from 'node-fetch';
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

const rapidapi_router = express.Router();

rapidapi_router.get('/api/teams', async (req, res) => {
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

rapidapi_router.get('/api/venues', async (req, res) => {
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

rapidapi_router.get('/api/standings', async (req, res) => {
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

rapidapi_router.get('/api/fixtures/back', async (req, res) => {
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

rapidapi_router.get('/api/fixtures/front', async (req, res) => {
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

rapidapi_router.get('/api/users_fantasy/', async (req, res) => {
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

rapidapi_router.get('/api/players', async (req, res) => {
  for (let i = 1; i <= 1; i++) {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players?league=262&season=2021&team=2289&page=2`,
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

rapidapi_router.get('/api/calculatePoints', async (req, res) => {
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
          points_tmp = 0;
          points_tmp +=
            pointsFormat.minutes *
              (player.statistics[0].games.minutes || 0) +
            pointsFormat.shots *
              (player.statistics[0].shots.on || 0) +
            pointsFormat.goals.total *
              (player.statistics[0].goals.total || 0) +
            pointsFormat.goals.conceded *
              (player.statistics[0].goals.conceded || 0) +
            pointsFormat.goals.assists *
              (player.statistics[0].goals.assists || 0) +
            pointsFormat.goals.saves *
              (player.statistics[0].goals.saves || 0) +
            pointsFormat.passes *
              parseInt(player.statistics[0].passes.accuracy || 0) +
            pointsFormat.tackles.blocks *
              (player.statistics[0].tackles.blocks || 0) +
            pointsFormat.tackles.interceptions *
              (player.statistics[0].tackles.interceptions || 0) +
            pointsFormat.dribbles *
              (player.statistics[0].dribbles.success || 0) +
            pointsFormat.cards.yellow *
              (player.statistics[0].cards.yellow || 0) +
            pointsFormat.cards.red *
              (player.statistics[0].cards.red || 0);
          Player.findOneAndUpdate(
            { player_id: player.player.id },
            { points: parseInt(points_tmp) },
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
            parseInt(points_tmp),
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

rapidapi_router.get('/api/coach', async (req, res) => {
  const response_back = await fetch(
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
  response_back.response.forEach(async (team) => {
    const team_id = team.team.id;

    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/coachs?team=${team_id}`,
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
        if (Array.isArray(data.response)) return data.response[0];
        else return data.response;
      });
    const dt_tmp = new Dt({
      dt_id: response.id,
      name: response.name,
      age: response.age,
      nationality: response.nationality,
      photo: response.photo,
      team_id: response.team.id
    });
    dt_tmp.save();
  });
  res.json('success');
});

rapidapi_router.get('/api/playerCosts', async (req, res) => {
  const players = await Player.find();
  players.forEach(async (player) => {
    let cost_tmp =
      (((player.rating || 6.3) - 6.3) * (5000000 - 1000000)) /
        (7.1 - 6.3) +
      1000000;
    if (cost_tmp < 1000000) cost_tmp = 1000000;
    else if (cost_tmp > 5000000) cost_tmp = 5000000;
    await Player.updateOne(
      { player_id: player.player_id },
      { $set: { cost: parseInt(cost_tmp) } }
    );
  });
  res.json('success');
});

export { rapidapi_router };
