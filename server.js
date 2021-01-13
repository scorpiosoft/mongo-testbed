const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
// deployment port
const PORT = process.env.PORT || 3001;
// initialize Express
const app = express();

// get around CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//
// Configure Middleware
//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// serve the public folder as a static directory
app.use(express.static("public"));
// log routes hit
app.use(logger('dev'));

// set mongoose to use promises
mongoose.Promise = Promise;
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local scraper database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/testbed";
let mongoInstance;

// import routes and give the server access to them
const testRoutes = require("./routes/api/test");
app.use(testRoutes);

// Start the API server
app.listen(PORT, async function() {
  mongoInstance = await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
