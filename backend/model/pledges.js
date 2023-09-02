const connection = require("../database/index")

const getAll = (callback) => {
  const sql = 'SELECT * FROM `pledges`'
  connection.query(sql,function (error,results){
      callback(error, results)
  })
};



const add = (pledgesData, callback) => {
  const sql = `INSERT INTO pledges (amount, users_iduser, projects_idprojects) VALUES (?, ?, ?)`;
  const { amount, users_iduser, projects_idprojects } = pledgesData;

  connection.query(sql, [amount, users_iduser, projects_idprojects], function (error, results) {
    callback(error, results);
  });
};
module.exports ={getAll ,add}