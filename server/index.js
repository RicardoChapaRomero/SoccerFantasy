// server/index.js
const express = require("express");
const path = require('path');

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
 *  req:
 * {
 *  method: 'form' / 'google'
 *  email: email,
 *  password: password
 * }
*/
app.get("/login", (req, res) => {
  console.log(req.query);
  res.json({ message: "User logged in" });
});

// Register Route
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
