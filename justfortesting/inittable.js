var mysql = require('mysql');

var con = mysql.createConnection({
  host: "twv.energyfussl.at",
  port: '3306',
  user: "Wolfg_twv",
  password: "9Bpo28w#",
  database: "Wolfgang_twv"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE table entlehnt(ID int unsigned not null auto_increment, primary key(ID), teachername varchar(100), `class` varchar(10), `date` DATE, lesson int, twfk int)", function(err, result){
    if(err) throw err;
    console.log('Database created: entlehnt')
  })
  con.query("CREATE table trennwaende(ID int unsigned not null auto_increment, primary key(ID), `name` varchar(30))", function(err, result){
    if(err) throw err;
    console.log('Database created: trennwaende')
  })
});
