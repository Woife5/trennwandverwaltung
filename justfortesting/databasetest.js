var path = require("path");
var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'userpw',
  database : 'trennwand'
});


con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = 'insert into trennwandtable values(null,"Matejka","5AHELS","23.10.2017",1,1,1,0,0,0),(null,"Matejka","4AHELS","24.10.2017",1,1,1,0,0,0),(null,"Wagner","3AHELS","23.10.2017",1,1,0,1,0,0),(null,"Matejka","5AHELS","24.10.2017",2,1,1,0,0,0),(null,"Wagner","2AHELS","23.10.2017",2,1,1,0,0,0),(null,"Wagner","1AHELS","25.10.2017",5,1,1,0,0,0);';
	con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("Values inserted");
	});
	con.query("SELECT * FROM trennwandtable", function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
		console.log("\n\nNEW\n\n");
		console.log(fields);
	});
});