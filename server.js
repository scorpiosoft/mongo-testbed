// dependencies
import express, { static } from "express";
import { urlencoded, json } from "body-parser";
import { Promise as _Promise, connect } from "mongoose";
// deployment port
const PORT = process.env.PORT || 3000;
// initialize Express
const app = express();

//
// Configure Middleware
//

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// parse application/json
app.use(json());
// serve the public folder as a static directory
app.use(static("public"));

// set mongoose to use promises
_Promise = Promise;
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local scraper database
const MONGODB_URI = process.env.MONGODB_URI || "testdb://localhost/testbed";
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// import routes and give the server access to them
import routes from "./routes";
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
