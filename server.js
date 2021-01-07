// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// deployment port
var PORT = process.env.PORT || 3000;
// initialize Express
var app = express();

//
// Configure Middleware
//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// serve the public folder as a static directory
app.use(express.static("public"));

// set mongoose to use promises
mongoose.Promise = Promise;
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local scraper database
var MONGODB_URI = process.env.MONGODB_URI || "testdb://localhost/testbed";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// import routes and give the server access to them
var test_routes    = require("./controllers/test.js");
app.use(test_routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
