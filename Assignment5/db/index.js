const mysql = require("mysql2");
// stablish connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "retail_store",
  user: "root",
  password: "",
});

function connectDB() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
}

module.exports = {connection, connectDB};

