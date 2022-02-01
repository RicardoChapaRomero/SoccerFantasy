import mongoose from 'mongoose';
const schema = mongoose.Schema;

const venue_schema = schema({
  venue_id: String,
  name: String,
  address: String,
  city: String,
  capacity: String,
  image: String
});

const team_schema = schema({
  team_id: String,
  name: String,
  founded: Number,
  logo: String,
  venue_id: String
});

const player_schema = schema({
  player_id: String,
  name: String,
  age: Number,
  position: String,
  photo: String,
  rating: String,
  team_id: String,
  goals: Number
});

const standings_schema = schema({
  rank: Number,
  team_id: String,
  points: Number,
  goals_diff: Number,
  goals_for: Number,
  goals_against: Number,
  total_wins: Number,
  total_draws: Number,
  total_losses: Number
});

const dt_schema = schema({
  dt_id: String,
  name: String,
  age: Number,
  nationality: String,
  photo: String
});

const user_schema = schema({
  name: String,
  email: String,
  password: {
    type: String,
    default: ''
  },
  teamName: String,
  method: String
});

const user_fantasy = schema({
  user_id: String,
  lineup: {
    type: String,
    default: '4-3-3'
  },
  budget: {
    type: Number,
    default: 5000000
  },
  team_lineup: {
    type: Object,
    default: {
      defense: [''],
      midfield: [''],
      attack: [''],
      bench: [''],
      dt: ['']
    }
  }
});
const User = mongoose.model('Users', user_schema);
const Player = mongoose.model('Players', player_schema);
const Dt = mongoose.model('Dts', dt_schema);
const Team = mongoose.model('Teams', team_schema);
const Venue = mongoose.model('Venues', venue_schema);
const Standing = mongoose.model('Standings', standings_schema);

export { User, Player, Dt, Team, Venue, Standing };
