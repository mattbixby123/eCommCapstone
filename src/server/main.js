// this is the index for the express server
require('dotenv').config() //load env variables
const express = require('express'); // Import Express framework
const { prisma } = require('./db')
const router = require('vite-express'); // Import Vite Express for serving Vite-built assets
const app = express(); // Create an Express application instance
const jwt = require("jsonwebtoken");
const port = process.env.PORT;
const path = require('path')

// Import body-parser middleware for parsing JSON request bodies
const bodyParser = require('body-parser')
// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'))
// app.use("/", express.static(path.join(__dirname, "public")));

// Static file-serving middleware / only needed for deployment
// app.use(express.static(path.join(__dirname, "..", "client/dist")));


// Check requests for a token and attach the decoded id to the request                                                                                            
app.use((req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  try {
    req.customer = jwt.verify(token, process.env.JWT);
  } catch {
    req.customer = null;
  }

  next();
});

// Backend routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
// app.use((req, res) => {
//   res.status(404).send("Not found.");
// });

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

// Start the server on port 3000 and log a message when it's ready
router.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
);

module.exports = router;