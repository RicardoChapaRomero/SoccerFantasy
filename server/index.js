// server/index.js
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookie_parser from 'cookie-parser';
import { user_router } from './routes/userRoutes.js';
// import { RapidApi } from './routes/rapidApiRoutes.js';
import { routerFantasy } from './routes/routesFantasy.js';
import { routerTest } from './routes/testRoutes.js';
import { rapidapi_router } from './routes/rapidApiRoutes.js';

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
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(morgan('dev'));

// routes
app.use('/fantasy', routerFantasy);
app.use('/test', routerTest);
app.use('/rapidapi', rapidapi_router);
app.use('/', user_router);


app.get('*', (req, res) => {
  console.log('redirecting');
  res.sendFile(
    path.resolve(__dirname, './client/build', 'index.html')
  );
});

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
