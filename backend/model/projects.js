// Create Operation - Insert a Project
const connection = require("../database/index")


const add = (ProjectData, callback) => {
  const sql = `INSERT INTO projects SET ?`;
  connection.query(sql, ProjectData, function (error, results) {
    callback(error, results);
  });
};
  
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
const remove = (projectid, callback) => {
  const sql = `DELETE FROM projects WHERE idprojects = ?`;
  connection.query(sql, [projectid], function(error, results) {
      callback(error, results);
  });
};
  // // Update Operation - Update Project Information
  // async function updateProject(projectId, newData) {
  //   const connection = await pool.getConnection();
  //   try {
  //     const query = `
  //       UPDATE projects 
  //       SET title = ?, description = ?, goal_amount = ?, current_amount = ?, 
  //       is_approved = ?, start_date = ?, end_date = ?, comment = ?, 
  //       users_iduser = ?
  //       WHERE idprojects = ?
  //     `;
  //     await connection.query(query, [
  //       newData.title,
  //       newData.description,
  //       newData.goal_amount,
  //       newData.current_amount,
  //       newData.is_approved,
  //       newData.start_date,
  //       newData.end_date,
  //       newData.comment,
  //       newData.users_iduser,
  //       projectId
  //     ]);
  //   } finally {
  //     connection.release();
  //   }
  // }
  
  // // Delete Operation - Delete a Project
  // async function deleteProject(projectId) {
  //   const connection = await pool.getConnection();
  //   try {
  //     await connection.query('DELETE FROM projects WHERE idprojects = ?', [projectId]);
  //   } finally {
  //     connection.release();
  //   }
  // }
  module.exports ={
    add,
    getAll,
    putProject,
    remove
  }