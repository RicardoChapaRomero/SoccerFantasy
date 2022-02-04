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

export { routerTest };
