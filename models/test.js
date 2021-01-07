// import PollAge from '../dialogs';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema({
  // publisher recommended age
  age: {
    type: Number,
    votes: [{ user: String, value: Number }],
    // average polled age
    avg: Number
  }
});
// testSchema.methods.pollAge = function(cb)
// {
//   res = PollAge();
// }

const Test = mongoose.model('Test', testSchema);

module.exports = Test;