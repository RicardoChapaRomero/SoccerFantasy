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
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
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

/* 
req.query : {
  pageRows : number,
  page : number (index),
  position: 'All' | 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker'
}
*/

routerFantasy.get('/player', async (req, res) => {
  const pageRows = req.query.pageRows;
  const page = req.query.page;
  const position = req.query.position;
  const query = position === 'All' ? {} : { position: position };
  Player.find(query, { strict: false })
    .populate({ path: 'team_object', model: Team })
    .limit(pageRows)
    .skip(pageRows * page)
    .exec(function (err, players) {
      if (err) {
        console.log(err);
        res.json(err);
        return;
      }
      console.log(players);
      res.json(players);
    });
});
export { routerFantasy };
