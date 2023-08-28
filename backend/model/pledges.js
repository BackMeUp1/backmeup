const myConfig = require("../database/config")


//! Create Operation - Insert a Pledge
async function createPledge(amount) {
    const connection = await myConfig.getConnection();
    try {
      await connection.query('INSERT INTO pledges (amount) VALUES (?)', [amount]);
    } finally {
      connection.release();
    }
  }


  //! Read Operation - Retrieve All Pledges
async function getAllPledges() {
    const connection = await myConfig.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM pledges');
      return rows;
    } finally {
      connection.release();
    }
  }

