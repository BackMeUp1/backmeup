const connection = require("../database/index.js");

const getAll = (callback) => {
    var sql  =`select * from users`
    connection.query(sql,(err,results)=>{ 
callback(err,results)
    })
}
 
const add = (callback,data) =>{
    var sql =`insert into users (name,email,password,role) values(?,?,?,?)`
    connection.query(sql,[data.name,data.email,data.password,data.role],(err,results)=>{
callback(err,results)
    })
}

  module.exports = { getAll,add};