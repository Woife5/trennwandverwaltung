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

//------------------------------------------------------------------------------POST /api/save, this is where every save request lands
app.post('/api/save', function(req, res) {
  if (!req.body) return res.sendStatus(400)

	let date = req.body.Datum
	let lesson = req.body.BeginnE
	let cases = req.body.AnzahlKoffer
	let teacher = req.body.LehrerKzl
	let schoolclass = req.body.Klasse

	console.log('Datum: '+date)
	console.log('Beginn: '+lesson)
	console.log('Koffer: '+cases)
	console.log('Lehrer: '+teacher)
	console.log('Klasse: '+schoolclass)

	console.log('Connected to GET')
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
		console.log('TOMYSQL: Booked: '+booked)
		con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
			if(err) throw err
			numberofcases = result[0].Anz
			console.log('TOMYSQL: Number of cases: '+numberofcases)
			if (numberofcases-booked >= cases) {
				//----------------------------------------------------------------------There are enough cases to reserve
				console.log('Es ist eine Trennwand frei, die Reserviert werden kann.')
				console.log('TOMYSQL: Numberofcases: '+numberofcases+' Booked: '+booked+' Cases: '+cases+' Numberofcases-booked: '+(numberofcases-booked))

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
							console.log(result)
							let ret = []
							for(let i = 0;i<result.length;i++){
								ret[i] = result[i].twname
							}
							callback(null, {data:ret})
						})
				  })

			}else {
				//----------------------------------------------------------------------There are not enough cases to reserve
				console.log('Zu diesem Zeitpunkt ist leider nichts mehr frei.')
				console.log('TOMYSQL: Numberofcases: '+numberofcases+' Booked: '+booked+' Cases: '+cases+' Numberofcases-booked: '+(numberofcases-booked))
				let err = {error:5, errortxt:'nothing to reserve',errordesc:'The user requested more cases than avalible.',userdesc:'Zu diesem Zeitpunkt sind nicht mehr genug Trennwände frei.'}
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
