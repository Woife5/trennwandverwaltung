const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')

const con = mysql.createConnection({
	host: 'twv.energyfussl.at',
	port: '3306',
  user: 'Wolfg_twv',
  password: '9Bpo28w#',
  database: 'Wolfgang_twv'
})
con.connect(function(err){
	if (err) throw err
})

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/new',function(req, res){
	res.sendFile(path.join(__dirname ,'public','calendar.html'))
})

app.get('/',function(req, res){
	res.sendFile(path.join(__dirname ,'index.html'))
})

app.get('/api/cases',function(req, res){
	let cases
	con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
		if(err) throw err
		cases = result[0].Anz
		con.query('SELECT name from trennwaende',function(err, result, fields){
			if(err) throw err
			let ret = {numberofcases:cases}
			for (let i = 0; i < cases; i++) {
				ret[i] = result[i].name
			}
			res.json(ret)
		})
	})
})

//------------------------------------------------------------------------------POST /api/save, this is where every save request lands
app.post('/api/save', function(req, res) {
  if (!req.body) return res.sendStatus(400)

	let date = req.body.Datum
	let lesson = req.body.BeginnE
	let cases = req.body.AnzahlKoffer
	let teacher = req.body.LehrerKzl
	let schoolclass = req.body.Klasse

	con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
    if (err) throw err
		let booked = result[0].booked
		toMySql(date, lesson, cases, teacher, schoolclass, function(error, data) {
			if(error) return res.status(400).json(error)
			res.json(data)
		})
	})
})

//------------------------------------------------------------------------------Actual function that does all the calculating
function toMySql(date, lesson, cases, teacher, schoolclass, callback){
	let avalible
	con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
    if (err) throw err
		let booked = result[0].booked
		con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
			if(err) throw err
			numberofcases = result[0].Anz
			avalible = numberofcases-booked
			if(cases > numberofcases){
				//----------------------------------------------------------------------Someone tried to reserve more cases than avalible
				let err
				if(avalible == 0){
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandboxen vorhanden, wovon keine mehr frei ist zu diesem Termin.'}
				}else if(avalible == 1){
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandboxen vorhanden, wovon eine noch frei ist zu diesem Termin.'}
				}else{
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandboxen vorhanden, wovon '+avalible+' noch frei sind zu diesem Termin.'}
				}
				callback(err, null)
			}else if (avalible >= cases) {
				//----------------------------------------------------------------------There are enough cases to reserve
				var sql = 'INSERT INTO entlehnt (ID, teachername, class, date, lesson, twfk) VALUES ?'
			  var values = []
				let i = 0
				for(let inserted = booked;inserted-booked<cases;inserted++){
					values[i] = ['null', teacher, schoolclass, date, lesson, inserted]
					i++
				}
				//----------------------------------------------------------------------Inserting into SQL Database
				con.query(sql, [values], function (err, result) {
				    if (err) throw err;
						//------------------------------------------------------------------Checking which colors have been reserved
						con.query('SELECT trennwaende.name as twname FROM entlehnt JOIN trennwaende ON entlehnt.twfk = trennwaende.ID where `date`="'+date+'" AND lesson='+lesson+' AND teachername = "'+teacher+'"', function (err, result, fields) {
					    if (err) throw err
							let ret = []
							for(let i = 0;i<result.length;i++){
								ret[i] = result[i].twname
							}
							callback(null, {data:ret})
						})
				  })
			}else if(avalible == 0){
				//----------------------------------------------------------------------None are free
				let err = {error:0, errortxt:'no free',errordesc:'No cases free.',userdesc:'Zu diesem Zeitpunkt sind keine Trennwandboxen mehr frei.'}
				callback(err, null)
			}else{
				//----------------------------------------------------------------------Not that many are free anymore
				let err = {error:5, errortxt:'nothing to reserve',errordesc:'The user requested more cases than free.',userdesc:'Zu diesem Zeitpunkt sind nurmehr '+avalible+' Trennwandboxen frei.'}
				callback(err, null)
			}
		})
	})
	//----------------------------------------------------------------------------End of toMySql
}

//------------------------------------------------------------------------------Server listening on Port 8000
app.listen(8000, function () {
  console.log('Webserver listening on port 8000!')
})
