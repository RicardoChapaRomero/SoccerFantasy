// server/index.js
const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
/**
UNCOMMENT UNTIL DEPLOYMENT

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

*/

// Methods
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server 2!" });
});

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
