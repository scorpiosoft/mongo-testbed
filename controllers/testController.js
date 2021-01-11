import { Test } from "../models";
import validate_exists from "../util/util"

// Defining methods for the testController
export function getAge(req, res) {
  Test.findOne(req.query)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
}
export function setAge(req, res) {
  let data = {};
  if (validate_exists(req.body.id))
  {
    Test.findById(req.body.id)
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
  }
  // check if this user already voted
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
  // const options = {
  //   upsert: true
  // }
  Test.updateOne({_id: data._id}, data/*, options*/)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
}