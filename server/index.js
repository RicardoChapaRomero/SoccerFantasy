// server/index.js
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB)
  .then(db => console.log('Connected to DB'))
  .catch(err => console.log(err));

const routes = require('./routes/routes');

app.set('port', PORT);
app.use(express.json());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes
app.use('/', routes);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
