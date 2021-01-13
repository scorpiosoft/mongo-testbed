// import PollAge from '../dialogs';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema({
  t: {
    alias: "title",
    type: String,
    required: true,
    index: true
  },
  // publisher recommended age
  age: {
    value: Number,
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

module.exports = {
  Test
}