const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')

const con = mysql.createConnection({
	host: 'twv.energyfussl.at',
	port: '3306',
  user: 'Wolfg_twv',
  password: '9Bpo28w#',
  database: 'Wolfgang_twv'
})

app.use(express.static('public'))

//------------------------------------------------------------------------------For debugging
var debugdate = '2017-11-28'
var debuglesson = 2
var debugduration = 1
var debugcases = 1
var debugteacher = 'Mate'
var debugclass = '5AHELS'

app.get('/debug', function(req, res){
	res.send('Debugging Page...')
	con.connect(function(err) {
		if (err) throw err
		console.log('DEBUG: Connected to SELECT')
		con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+debugdate+'" AND lesson='+debuglesson, function (err, result, fields) {
	    if (err) throw err
			var booked = result[0].booked
			console.log('DEBUG: Booked: '+booked)
			toMySql(debugdate, debuglesson, debugduration, debugcases, debugteacher, debugclass, booked)
		})
	})

})
//------------------------------------------------------------------------------End of debugging

app.get('/',function(req,res){
	res.sendFile('index.html')
})

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.post('/save',urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
	res.send(req.body)

	var date = req.body.Datum
	var lesson = req.body.BeginnE
	var duration = req.body.AnzahlE
	var cases = req.body.AnzahlKoffer
	var teacher = req.body.LehrerKzl
	var schoolclass = req.body.Klasse

	console.log('Datum: '+date)
	console.log('Beginn: '+lesson)
	console.log('Dauer: '+duration)
	console.log('Koffer: '+cases)
	console.log('Lehrer: '+teacher)
	console.log('Klasse: '+schoolclass)

	con.connect(function(err) {
		if (err) throw err
		console.log('Connected to GET')
		con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
	    if (err) throw err
			var booked = result[0].booked
			toMySql(date, lesson, duration, cases, teacher, schoolclass, booked)
		})

	})
})

//------------------------------------------------------------------------------Actual function that does all the calculating
function toMySql(date, lesson, duration, cases, teacher, schoolclass, booked){
	var sqlStr = 'INSERT INTO entlehnt VALUES '
	sqlStr += '(null,"'+teacher+'","'+schoolclass+'","'+date+'",'+lesson+','+duration+','

	if(booked == 0){
		sqlStr += '1)'
		insertIntoDatabase(sqlStr)
	}else{
		//--------------------------------------------------------------------------toMySql function
		var avalible
		con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
			if(err) throw err
			cases = result[0].Anz
			console.log('TOMYSQL: Number of cases: '+cases)
			if (cases > booked) {
				console.log('Es ist eine Trennwand frei, die Reserviert werden kann.')
				sqlStr += booked + ')'
				insertIntoDatabase(sqlStr)
			}else {
				console.log('Zu diesem Zeitpunkt ist leider nichts mehr frei.')
			}
		})
	}
	//----------------------------------------------------------------------------End of toMySql
}
function insertIntoDatabase(sqlStr){
	console.log('INSERT FUNCTION: '+sqlStr)
	//----------------------------------------------------------------------------Inserting into SQL Database is curently disabled
	/*con.query(sqlStr, function(err, result, fields){
		if(err) throw error
	})*/
}

app.listen(8000, function () {
  console.log('Webserver listening on port 8000!')
})
