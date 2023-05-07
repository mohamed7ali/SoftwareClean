const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earysystem",
  port: "3306",
 
});
connection.connect((err) => {
  if (err) {
    console.error("error connection", err);
    return;
  } else {
    console.log("connection established");
  }
});

connection.config.typeCast = true; // Add this line

const query = util.promisify(connection.query).bind(connection);

module.exports = { connection, query };
