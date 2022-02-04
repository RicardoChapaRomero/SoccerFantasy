import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { verifyToken } from '../middleware/verifyToken.js';
import { generateToken } from '../middleware/generateToken.js';
import { User } from '../models/model.js';

const user_router = express.Router();
// Routes
// Test Route
user_router.get('/api', async (req, res) => {
  console.log('here');
  res.json({ message: 'Hello from server!' });
});

/** Login Route
 *  req.query:
 * {
 *  method: 'form' / 'google'
 *  email: email,
 *  password: password
 * }
 */
user_router.get('/login', async (req, res) => {
  const query = req.query;

  // As Google users don't need to register with their password,
  // we just need to lookup their email to see if they're
  // registered
  let user_is_registered = false;
  const user_DB = await User.findOne({ email: query.email });
  
  if (user_DB !== null) {
    if (query.method === 'form') {
      user_is_registered =
        query.email === user_DB.email &&
        bcrypt.compareSync(query.password, user_DB.password);
    } else {
      user_is_registered = query.email === user_DB.email;
    }
  }

  let response = { userIsRegistered: user_is_registered };
  if (user_is_registered) {
    response.sessionToken = generateToken(user_DB._id);
    response.name = user_DB.name;
  }

  res.json({ message: response });
});

/** Login Route
 *  req.body:
 * {
 *  email: 'email',
 *  password: 'password',
 *  name: 'name',
 *  teamName: 'team'
 * }
 */
user_router.post('/register', async (req, res) => {
  // Return early if user is already registered
  if ((await User.findOne({ email: req.body.email })) !== null) {
    res.json({
      message: { alreadyRegistered: true, registered: true }
    });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  // Push new user to DB
  const new_user = new User(req.body);
  await new_user.save();
  res.json({
    message: { alreadyRegistered: false, registered: true }
  });
});

// Verify Token Handler
user_router.get('/verifyToken', verifyToken, (req, res) => {
  res.json({
    message: { userId: req.userId }
  });
});

/** Verify User Route
 *
 * req.query:
 * {
 *  userId: id
 * }
 * */
user_router.get('/verifyUser', async (req, res) => {
  const user = await User.findById({ _id: req.query.userId });

  res.json({
    message: { userIsRegistered: user !== null }
  });
});

// All other GET requests not handled before will return our React app
//
// Leave this route after all defined routes and middleware
/*const __dirname = path.resolve();
user_router.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/build', 'index.html')
  );
});*/

export { user_router };
