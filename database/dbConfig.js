const mysql = require('mysql');

const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root123',
      database: 'production'
    });

con.connect((err)=>{
    if(err){
        console.warn("Error in the connect to database");
    }
    console.log('database connected....')
});

module.exports = con;