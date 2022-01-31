const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = schema({
  name: String,
  email: String,
  password: {
    type: String,
    default: ''
  },
  teamName: String,
  lineup: String,
  budget: Number,
  team_lineup: {
    defense: [player_schema],
    midfield: [player_schema],
    attack: [player_schema],
    dt: [String]
  },
  method: String
});

const standings_schema = schema({
  ranks: [
    {
      team: team_schema,
      rank: Number,
      goals_diff: Number,
      total_wins: Number,
      total_draws: Number,
      total_losses: Number
    }
  ]
});

const player_schema = schema({
  id: String,
  name: String,
  age: Number,
  position: String,
  photo: String,
  team: team_schema
});

const dt_schema = schema({
  id: String,
  name: String,
  age: Number,
  nationality: String,
  photo: String
});
const team_schema = schema({
  id: String,
  name: String,
  foundation: Number,
  logo: String,
  venue: venue_schema
});

const venue_schema = schema({
  id: String,
  name: String,
  address: String,
  city: String,
  capacity: String,
  image: String
});

module.exports = mongoose.model('users', user_schema);
module.exports = mongoose.model('players', player_schema);
module.exports = mongoose.model('dts', dt_schema);
module.exports = mongoose.model('teams', team_schema);
module.exports = mongoose.model('venues', venue_schema);
