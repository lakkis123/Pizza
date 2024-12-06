var mysql = require('mysql2');
const db = mysql.createConnection({
host: 'localhost',
user: 'Ahmed',
password: 'PROJECT',
database: 'interviewproject',
});
db.connect((err)=> {if(err){console.error("Error connecting to sql server",err);
return;
}console.log("Connected to Mysql server");});
export default db;
