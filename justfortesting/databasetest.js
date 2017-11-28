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
	var sql = 'insert into entlehnt values(null,"Matejka","5AHELS","2017-10-23",1,1),(null,"Matejka","4AHELS","2017-10-24",1,1),(null,"Wagner","3AHELS","2017-10-23",1,2),(null,"Matejka","5AHELS","2017-10-24",2,1),(null,"Wagner","2AHELS","2017-10-24",2,1),(null,"Wagner","1AHELS","2017-10-25",5,1);';
	con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("Values inserted");
	});
  con.query('insert into trennwaende values(null,"Blau"),(null,"Grün"),(null,"Rot"),(null,"Gelb")',function(err, result){
    if(err) throw err;
    console.log('Trennwände angelegt')
  })
	con.query('SELECT * FROM entlehnt JOIN trennwaende on entlehnt.twfk = trennwaende.ID', function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
	});
});
