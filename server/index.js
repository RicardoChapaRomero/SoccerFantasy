// server/index.js
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookie_parser from 'cookie-parser';
import { user_router } from './routes/userRoutes.js';
import { rapidapi_router } from './routes/rapidApiRoutes.js';
import { routerFantasy } from './routes/routesFantasy.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();
const uri = `mongodb+srv://mikeinsane:${process.env.MONGO_KEY}@fantasy.wsmyk.mongodb.net/Fantasy?retryWrites=true&w=majority`;

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
app.use(cookie_parser());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// routes
app.use('/', user_router);
app.use('/rapidapi', rapidapi_router);
app.use('/fantasy', routerFantasy);

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
