var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost:3306",
  user: "Wolfg_twv",
  password: "9Bpo28w#"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE trennwand", function (err, result) {
    if (err) throw err;
    console.log("Database created: trennwand");
  });
});