// server/index.js
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router } from './routes/routes.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();
const uri =
  'mongodb+srv://mikeinsane:soccerFantasy@fantasy.wsmyk.mongodb.net/Fantasy?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3001;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.set('port', PORT);
app.use(express.json());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes
app.use('/', router);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
