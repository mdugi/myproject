const db = require('./db');
const conn = db.conndb;

function getAllUsers(callback){ 
    conn.query(`SELECT * FROM users ORDER BY id DESC`, (err, rows, fields) => { 
        if(err) throw err; 
        callback(rows);
    }); 
} 

module.exports = { 
    getAllUsers 
}
