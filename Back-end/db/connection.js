const mysql = require("mysql");
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
module.exports = connection;
