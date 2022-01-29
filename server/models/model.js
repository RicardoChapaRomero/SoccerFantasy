const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = schema({
  name: String,
  email: String,
  password: {
    type: String,
    default: ""
  },
  teamName: String,
  method: String,
});

module.exports = mongoose.model('users', user_schema);
