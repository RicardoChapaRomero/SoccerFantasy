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

const fetchStanding = async () => {
  const response = await Standing.find({});
  return await response.json();
};

routerFantasy.get('/standing', async (req, res) => {
  Standing.find({})
    .then((docs) => {
      const comp = (a, b) => {
        return a.rank < b.rank ? -1 : 1;
      };
      const sortedTeams = docs.sort(comp);
      res.json(sortedTeams);
    })
    .catch((err) => {
      res.json(err);
    });
});
export { routerFantasy };
