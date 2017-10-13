var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpw",
  database: "trennwand"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
var sql = "drop table trennwandtable;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table dropped");
  });
  var sql = "create table trennwandtable(id int not null auto_increment,primary key(id),teachername varchar(100),`class` varchar(10),`date` varchar(10),`lesson` int, `duration` int, trennwand1 boolean,trennwand2 boolean, trennwand3 boolean, trennwand4 boolean);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});