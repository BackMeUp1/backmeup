const myConfig = require("../database/config")

// Create a new pledge
exports.createPledge = async (amount) => {
  const [result] = await myConfig.query('INSERT INTO pledges (amount) VALUES (?)', [amount]);
  return result.insertId;
};

// Get all pledges
exports.getAllPledges = async () => {
  const [rows] = await MyConfig.query('SELECT * FROM pledges');
  return rows;
};