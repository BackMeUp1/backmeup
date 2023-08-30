const connection = require("../database/index.js");
const bcrypt = require('bcrypt');

const getAll = (callback) => {
    var sql  =`select * from users`
    connection.query(sql,(err,results)=>{ 
callback(err,results)
    })
}

const addUser = (userData, callback) => {
    const { name, email, password, role } = userData;
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
            callback(hashErr, null);
        } else {
            const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
            connection.query(sql, [name, email, hashedPassword, role], (err, results) => {
                console.log(err);
                callback(err, results);
            });
        }
    });
};

const getUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    connection.query(sql, [email], (err, results) => {
        callback(err, results);
    });
};
const remove = (usersId, callback) => {
    const sql = `DELETE FROM users WHERE iduser = ?`;
    connection.query(sql, [usersId], function(error, results) {
        callback(error, results);
    });
}

module.exports = { addUser, getUserByEmail ,getAll,remove};
