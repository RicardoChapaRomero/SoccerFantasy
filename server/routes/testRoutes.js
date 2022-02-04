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

const routerTest = express.Router();

routerTest.get('/standing', async (req, res) => {
  for await (const standing of Standing.find({})) {
    const team = await Team.findOne({
      team_id: standing.team_id
    });
    standing.team_object = team._id;
    await standing.save();
  }
});

routerTest.get('/player', async (req, res) => {
  for await (const player of Player.find({})) {
    const team = await Team.findOne({
      team_id: player.team_id
    });
    player.team_object = team._id;
    await player.save();
  }
  res.json({ success: 'TATAKAE' });
});

routerTest.get('/dt', async (req, res) => {
  for await (const dt of Dt.find({}, { strict: false })) {
    const team = await Team.findOne({
      team_id: dt.team_id
    });
    dt.team_object = team._id;
    await dt.save();
  }
  res.json({ success: 'TATAKAE' });
});

routerTest.get('/round', async (req, res) => {
  for await (const round of Round.find({})) {
    const team_home = await Team.findOne({
      team_id: round.home_team_id
    });

    const team_away = await Team.findOne({
      team_id: round.away_team_id
    });

    round.home_team_object = team_home._id;
    round.away_team_object = team_away._id;

    await round.save();
  }
  res.json({ success: 'TATAKAE' });
});

export { routerTest };
