// server/index.js
const express = require("express");
const path = require('path');
const fs = require('fs'); // Only used for mockDB JSON

// Function to read JSON file mocking mongo DB
const readMockDB = () => {
  const rawdata = fs.readFileSync(path.resolve(__dirname, './mockDB/mockDB.json'));
  return JSON.parse(rawdata);
};

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Routes
// Test Route
app.get("/api", (req, res) => {
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
app.get("/login", (req, res) => {
  const data = readMockDB();
  const method = req.query.method;
  let userInDB = false;
  data["users"].forEach((user) => {
    if (method == 'google' && user['method'] == 'google') {
      if (user['email'] == req.query.email) {
        res.json({ message: { userIsRegistered: 'true' } });
        userInDB = true;
        return;
      }
    } else if (method == 'form' && user['method'] == 'form') {
      if (user['email'] == req.query.email && user['password'] == req.query.password) {
        res.json({ message: { userIsRegistered: 'true' } });
        userInDB = true;
        return;
      }
    }
  });
  if (!userInDB) { res.json({ message: { userIsRegistered: 'false' } }); }
});

/** Login Route
 *  req.body:
 * {
 *  email: 'email',
 *  password: 'password',
 *  name: 'name',
 *  team: 'team'
 * }
*/
app.post("/register", (req, res) => {
  console.log(req.body);
  res.json({ message: "User registered" });
});

// All other GET requests not handled before will return our React app
//
// Leave this route after all defined routes and middleware
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
