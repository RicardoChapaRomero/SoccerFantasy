const express = require('express');
const router = express.Router();
const User = require('../models/model');

// Routes
// Test Route
router.get("/api", (req, res) => {
  console.log('here');
  res.json({ message: "Hello from server!" });
});

/** Login Route
 *  req.query:
 * {
 *  method: 'form' / 'google'
 *  email: email,
 *  password: password
 * }
*/
router.get("/login", async (req, res) => {
  const query = req.query;

  // As Google users don't need to register with their password,
  // we just need to lookup their email to see if they're
  // registered

  let user_filter = { email: query.email };
  if (query.method === 'form') {
    user_filter.password = query.password;
  }

  const user_is_registered = await User.findOne(user_filter);
  res.json({ message: { userIsRegistered: !(user_is_registered === null) } });
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
router.post("/register", async (req, res) => {
  // Return early if user is already registered
  if (await User.findOne({ email: req.body.email }) !== null) {
    res.json({ message: { alreadyRegistered: true, registered: true } });
    return;
  }

  const new_user = new User(req.body);
  await new_user.save();
  res.json({ message: { alreadyRegistered: false, registered: true } });
});

// All other GET requests not handled before will return our React app
//
// Leave this route after all defined routes and middleware
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = router;
