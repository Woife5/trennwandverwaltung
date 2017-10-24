var path = require("path");
var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'twv.energyfussl.at',
  port     : '3306',
  user     : 'Wolfg_twv',
  password : '9Bpo28w#',
  database : 'Wolfgang_twv'
});


con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = 'insert into trennwand values(null,"Matejka","5AHELS","2017-10-23",1,1,true,false,false,false),(null,"Matejka","4AHELS","2017-10-24",1,1,true,false,false,false),(null,"Wagner","3AHELS","2017-10-23",1,1,false,true,false,false),(null,"Matejka","5AHELS","2017-10-24",2,1,true,false,false,false),(null,"Wagner","2AHELS","2017-10-24",2,1,true,false,false,false),(null,"Wagner","1AHELS","2017-10-25",5,1,true,false,false,false);';
	con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("Values inserted");
	});
	con.query("SELECT * FROM trennwand", function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
	});
});