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

const routerFantasy = express.Router();

routerFantasy.get('/dt', async (req, res) => {
  Dt.find({})
    .then((docs) => {
      res.json({ docs: docs });
    })
    .catch((err) => {
      res.json({ docs: [], err: err });
    });
});

export { routerFantasy };
