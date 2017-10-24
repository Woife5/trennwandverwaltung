var mysql = require('mysql');

var con = mysql.createConnection({
  host: "twv.energyfussl.at:3306",
  user: "Wolfg_twv",
  password: "9Bpo28w#",
  database: "Wolfgang_twv"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
var sql = "drop table trennwand;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table dropped");
  });
  var sql = "create table trennwand(id int not null auto_increment,primary key(id),teachername varchar(100),`class` varchar(10),`date` DATE,`lesson` int, `duration` int, trennwand1 boolean,trennwand2 boolean, trennwand3 boolean, trennwand4 boolean);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});