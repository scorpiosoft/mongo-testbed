import { Test } from "../models";
import validate_exists from "../util/util"

// Defining methods for the testController
export function getAge(req, res) {
  Test.findOne(req.query)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
}
export function setAge(req, res) {
  let data = {
    age: req.body.a,
    user: req.body.u
  }
  if (validate_exists(req.body.id))
    data._id = req.body.id;
  const options = {
    upsert: true
  }
  Test.findOneAndUpdate(data, options)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
}