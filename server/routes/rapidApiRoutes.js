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

const RAPID_API_URL = 'https://api-football-v1.p.rapidapi.com/v3';

class RapidApi {
  static async getTeams() {
    const response = await fetch(
      `${RAPID_API_URL}teams?league=262&season=2021`,
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
  }

  static async getVenus() {
    const response = await fetch(
      `${RAPID_API_URL}teams?league=262&season=2021`,
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
  }

  static async getStandings() {
    const response = await fetch(
      `${RAPID_API_URL}standings?league=262&season=2021`,
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
  }

  static async getBackFixtures() {
    const response_back = await fetch(
      `${RAPID_API_URL}fixtures?league=262&season=2021&timezone=America/Mexico_City&last=9`,
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
  }

  static async getFrontFixtures() {
    const response_back = await fetch(
      `${RAPID_API_URL}fixtures?league=262&season=2021&timezone=America/Mexico_City&next=9`,
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
  }

  static async getPlayers() {
    for (let i = 1; i <= 1; i++) {
      const response = await fetch(
        `${RAPID_API_URL}players?league=262&season=2021&page=${i}`,
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
  }

  static async calculatePoints() {
    let points_tmp = 0;
    let x = true;
    let tmp = 0;
    Round.find({ status: 'Match Finished' }, async (err, docs) => {
      docs.forEach(async (round) => {
        const response = await fetch(
          `${RAPID_API_URL}fixtures/players?fixture=${round.round_id}`,
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
  }

  static async getUserFantasy() {
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
  }
};

export { RapidApi };
