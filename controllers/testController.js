const Test = require("../models/test");
const util = require("../util/util");

// Defining methods for the testController
function getAge(req, res) {
  console.log('testController:getAge');
  Test.findOne({}, 'age _id')
      .then(data => {res.json(data);console.log(data)})
      .catch(err => res.status(422).json(err));
}
function setAge(req, res) {
  console.log('testController:setAge');
  let data = undefined;
  if (util.validate_exists(req.body._id))
  {
    Test.findById(req.body._id)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    console.log(`setAge:findById:data:${JSON.stringify(data,null,2)}`);
  }
  console.log(`sanity check:data:${JSON.stringify(data,null,2)}`);
  // check if this user already voted
  if (util.validate_exists(data))
  {
    const votedIdx = data.age.votes.find(e => e.user === req.body.u);
    if (votedIdx)
    {
      data.age.votes[votedIdx].value = req.body.a;
    } else {
      data.age.votes.push({user: req.body.u, value: req.body.a});
    }
    const len = data.age.votes.length;
    const tot = data.age.votes.reduce((accum, cur) => accum + cur.value, 0);
    data.age.avg = Math.round(tot/len);
  } else {
    // technically, should never get here
    console.log(`id (${req.body._id}) not found`)
    data = { age: { value: 13, votes: [{user: req.body.u, value: req.body.a}], avg: req.body.a } };
  }
  // const options = {
  //   upsert: true
  // }
  console.log(`updateOne: (${JSON.stringify(data,null,2)})`)
  // Test.updateOne({_id: data._id}, data, options)
  Test.updateOne({_id: data._id}, data)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
}
module.exports = { getAge, setAge }