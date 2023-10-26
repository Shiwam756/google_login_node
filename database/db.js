const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "AddRupee",
  password: "Addrupee@7052",
  database: "addrupee",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database as id " + db.threadId);
});

module.exports = db;
