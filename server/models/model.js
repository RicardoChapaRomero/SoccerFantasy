import mongoose from 'mongoose';
const schema = mongoose.Schema;
const { Schema } = mongoose;

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
  team_object: { type: Schema.Types.ObjectId, ref: 'Teams' },
  goals: Number,
  points: Number
});

const standings_schema = schema({
  rank: Number,
  team_id: String,
  team_object: { type: Schema.Types.ObjectId, ref: 'Teams' },
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
      goalkeeper: String,
      defense: [''],
      midfield: [''],
      attack: [''],
      bench: [''],
      dt: ['']
    }
  }
});

const rounds_schema = schema({
  round_id: Number,
  round_name: String,
  referee: String,
  date: String,
  venue_id: Number,
  status: String,
  home_team_id: Number,
  away_team_id: Number,
  home_team_object: { type: Schema.Types.ObjectId, ref: 'Teams' },
  away_team_object: { type: Schema.Types.ObjectId, ref: 'Teams' },
  goals_home: Number,
  goals_away: Number
});

const User = mongoose.model('Users', user_schema);
const Player = mongoose.model('Players', player_schema);
const Dt = mongoose.model('Dts', dt_schema);
const Team = mongoose.model('Teams', team_schema);
const Venue = mongoose.model('Venues', venue_schema);
const Standing = mongoose.model('Standings', standings_schema);
const Round = mongoose.model('Rounds', rounds_schema);

export { User, Player, Dt, Team, Venue, Standing, Round };
