const { getAll, add } = require("../model/users");

const getUsers = (req, res) => {
  getAll((err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
};

const addUsers = (req, res) => {
  add((err, results) => {
    if (err) {
      res.status(501).json(err);
    } else {
      res.status(201).json(results);
    }
  }, req.body);
};

module.exports = {
    getUsers,
    addUsers
  };