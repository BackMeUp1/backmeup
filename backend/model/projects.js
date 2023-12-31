const connection = require("../database/index")


const add = (ProjectData, callback) => {
  const sql = `INSERT INTO projects SET ?`;
  connection.query(sql, ProjectData, function (error, results) {
    callback(error, results);
  });
};


const putAmount = (idprojects, updatedData, callback) => {
  const sql = `UPDATE projects SET current_amount = ? WHERE idprojects = ?`;
  connection.query(sql, [updatedData, idprojects], function(error, results) {
      callback(error, results);
  });
};



  
const getPermission=(ProjectData, callback)=>{
  const sql = 'SELECT * FROM projects WHERE is_approved = 0';
   connection.query(sql, ProjectData, function (error, results) {
    callback(error, results);
  });

}


const getPermissionApproved=( callback)=>{
  const sql = 'SELECT * FROM projects WHERE is_approved = 1';
   connection.query(sql, function (error, results) {
    callback(error, results);
  });

}

  const getAll = (callback) => {
    const sql = 'SELECT * FROM `projects`'
    connection.query(sql,function (error,results){
        callback(error, results)
    })
};
  
const putProject = (idprojects, updatedData, callback) => {
  const sql = `UPDATE projects SET ? WHERE idprojects = ?`;
  connection.query(sql, [updatedData, idprojects], function(error, results) {
      callback(error, results);
  });
};

const putProjectPermission = (idprojects, updatedData, callback) => {
  const sql = `UPDATE projects SET is_approved = ? WHERE idprojects = ?`;
connection.query(sql, [updatedData, idprojects], function(error, results) {
      callback(error, results);
  });
};

const remove = (projectid, callback) => {
  const sql = `DELETE FROM projects WHERE idprojects = ?`;
  connection.query(sql, [projectid], function(error, results) {
      callback(error, results);
  });
};
  module.exports ={
    add,
    getAll,
    putProject,
    remove,
    getPermission,
    putProjectPermission,
    getPermissionApproved,
    putAmount
  }