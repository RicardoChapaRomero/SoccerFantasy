import express from 'express';
import fetch from 'node-fetch';
import {
  User,
  Player,
  Dt,
  Team,
  Venue,
  Standing,
  Round,
  Fantasies
} from '../models/model.js';

const routerFantasy = express.Router();

routerFantasy.get('/dt', async (req, res) => {
  Dt.find({})
    .populate({ path: 'team_object', model: Team })
    .exec(function (err, dts) {
      if (err) {
        console.log(err);
        res.json(err);
        return;
      }
      res.json(dts);
    });
});

routerFantasy.get('/standing', async (req, res) => {
  Standing.find({}, { strict: false })
    .populate({ path: 'team_object', model: Team })
    .sort({ rank: 1 })
    .exec(function (err, standing) {
      if (err) {
        console.log(err);
        res.json(err);
        return;
      }
      console.log(standing);
      res.json(standing);
    });
});

routerFantasy.get('/round', async (req, res) => {
  Round.find({}, { strict: false })
    .populate({ path: 'home_team_object', model: Team })
    .populate({ path: 'away_team_object', model: Team })
    .sort({ round_name: 1 })
    .exec(function (err, round) {
      if (err) {
        console.log(err);
        res.json(err);
        return;
      }
      console.log(round);
      res.json(round);
    });
});

/* 
req.query : {
  pageRows : number,
  page : number (index),
  position: 'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
  searchText: string
}
*/

routerFantasy.get('/players', async (req, res) => {
  const pageRows = req.query.pageRows;
  const page = req.query.page;
  const position = req.query.position;
  const searchText = req.query.searchText;
  let query = position === 'All' ? {} : { position: position };
  if (searchText !== '') {
    query = { ...query, name: { $regex: searchText, $options: 'i' } };
  }
  Player.find(query, { strict: false })
    .skip(Number(parseInt(pageRows) * parseInt(page)))
    .limit(pageRows)
    .populate({ path: 'team_object', model: Team })
    .exec(function (err, players) {
      if (err) {
        console.log(err);
        res.json(err);
        return;
      }
      res.json(players);
    });
});

/**
 * {
 *   players: {
 *     Goalkeeper: [],
 *     Defender: [ [Object] ],
 *     Midfielder: [ [Object] ],
 *     Attacker: [ [Object] ]
 *   },
 *   formation: '4-3-3'
 * }
 */
routerFantasy.post('/saveFantasy/:id', async (req, res) => {
  const user_id = req.params.id;

  let attackers = [],
    defenders = [],
    midfielders = [],
    bench = [],
    dt = [];
  let goalkeeper = '';

  const formation = req.body.formation;
  const team = req.body.players;
  team.Attacker.forEach((player) => {
    attackers.push(player.id);
  });

  team.Defender.forEach((player) => {
    defenders.push(player.id);
  });

  team.Midfielder.forEach((player) => {
    midfielders.push(player.id);
  });

  team.Goalkeeper.forEach((player) => {
    goalkeeper = player.id;
  });

  // Save Fantasy Points
  let temp_plyrs = attackers.concat(midfielders, defenders);
  temp_plyrs.push(goalkeeper);

  const players_data = await Player.find({
    player_id: {
      $in: temp_plyrs
    }
  });

  let fantasy_points = 0;
  for (const player of players_data) {
    fantasy_points += Number.parseInt((player.points) ? player.points : '0');
  }

  const fantasy = {
    user_id: user_id,
    fantasy_points: fantasy_points,
    lineup: formation,
    team_lineup: {
      goalkeeper: goalkeeper,
      defense: defenders,
      midfield: midfielders,
      attack: attackers,
      bench: bench,
      dt: (team.Dt.id !== -1) ? team.Dt : dt
    }
  };

  if ((await Fantasies.findOne({ user_id: user_id }, { strict: false })) !== null) {
    await Fantasies.updateOne({ user_id: user_id }, fantasy);
  } else {
    const new_fantasy = new Fantasies(fantasy);
    await new_fantasy.save();
  }

  res.json({
    message: { done: true }
  });
});

routerFantasy.get('/getFantasy/:id', async (req, res) => {
  const user_id = req.params.id;
  const user_fantasy = await Fantasies.findOne({ user_id: user_id });

  let message = {};
  if (user_fantasy !== null) {
    message.team = user_fantasy;
  }

  res.json({ message: message });
});

routerFantasy.get('/getPlayer', async (req, res) => {
  const player_ids_str = req.query.players
  const player_ids = player_ids_str.split(',');
  //let players = [];

  /*for (const id of player_ids) {
    const player_DB = await Player.findOne({player_id: id});
    players.push(await player_DB);
  }*/

  const players = await Player.find({
    player_id: {
      $in: player_ids
    }
  });

  let team = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: []
  }

  for (const player of players) {
    team[player.position].push({
      id: player.player_id,
      name: player.name,
      img: player.photo,
      position: player.position
    });
  }

  res.json({ message: { team: team } });
});

export { routerFantasy };
