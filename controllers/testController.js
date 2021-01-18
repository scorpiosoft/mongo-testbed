const Test = require("../models/test");
const util = require("../util/util");

// getAge - get the 'age' field
// TODO - allow a 'title' or 'id' to be passed in
function getAge(req, res) {
  console.log('testController:getAge');
  Test.findOne({}, 'age _id')
      .then(data => {res.json(data);console.log(data)})
      .catch(err => res.status(422).json(err));
    // Test.findById(req.body._id)
    //     .then(data => res.json(data))
    //     .catch(err => res.status(422).json(err));
    // data = { age: { value: 13, votes: [{user: req.body.u, value: req.body.a}], avg: req.body.a } };
}
// setAge - set the 'age' field
//   requires the request body to be a complete 'age' document, also _id
function setAge(req, res) {
  let data = req.body;
  console.log(`testController:setAge:data(${JSON.stringify(data,null,2)})`);
  if (util.validate_exists(data._id))
  {
    // check if this user already voted
    if (util.validate_exists(data.age.votes))
    {
      const votedIdx = data.age.votes.findIndex(e => e.user === data.u);
      if (votedIdx)
      {
        data.age.votes[votedIdx].value = data.a;
      } else {
        data.age.votes.push({user: data.u, value: req.body.a});
      }
      const len = data.age.votes.length;
      const tot = data.age.votes.reduce((accum, cur) => accum + cur.value, 0);
      data.age.avg = Math.round(tot/len);
    } else {
      // technically, should never get here
      console.log(`testController:setAge no 'votes' property: (${JSON.stringify(data.age,null,2)})`)
      return {};
    }
    // const options = {
    //   upsert: true
    // }
    console.log(`testController:setAge updateOne: (${JSON.stringify(data,null,2)})`)
    // Test.updateOne({_id: data._id}, data, options)
    Test.updateOne({_id: data._id}, data)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
  } else {
    console.log('testController:setAge - data._id does not exist');
    return {};
  }
}
module.exports = { getAge, setAge }