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
  var sql = "create table trennwandtable(id int not null auto_increment,primary key(id),teachername varchar(100),`class` varchar(10),`date` varchar(10),`lesson` int, `duration` int, trennwand1 int,trennwand2 int, trennwand3 int, trennwand4 int);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});