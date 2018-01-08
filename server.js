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
con.connect(function(err){
	if (err) throw err
})

app.use(express.static('public'))

//------------------------------------------------------------------------------For debugging
var debugdate = '2017-12-12'
var debuglesson = 2
var debugcases = 2
var debugteacher = 'Mate'
var debugclass = '5AHELS'

app.get('/debug', function(req, res){
	res.send('Debugging Page...')
		toMySql(debugdate, debuglesson, debugcases, debugteacher, debugclass)

})
//------------------------------------------------------------------------------End of debugging

app.get('/',function(req,res){
	res.render('index.html')
})

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.post('/save',urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)

	res.render('saved.html')

	var date = req.body.Datum
	var lesson = req.body.BeginnE
	var cases = req.body.AnzahlKoffer
	var teacher = req.body.LehrerKzl
	var schoolclass = req.body.Klasse

	console.log('Datum: '+date)
	console.log('Beginn: '+lesson)
	console.log('Koffer: '+cases)
	console.log('Lehrer: '+teacher)
	console.log('Klasse: '+schoolclass)

	console.log('Connected to GET')
	con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
    if (err) throw err
		var booked = result[0].booked
		toMySql(date, lesson, cases, teacher, schoolclass)
	})
})

//------------------------------------------------------------------------------Actual function that does all the calculating
function toMySql(date, lesson, cases, teacher, schoolclass){
	var sqlStr = 'INSERT INTO entlehnt VALUES '
	sqlStr += '(null,"'+teacher+'","'+schoolclass+'","'+date+'",'+lesson+','
	var avalible
	con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
    if (err) throw err
		var booked = result[0].booked
		console.log('TOMYSQL: Booked: '+booked)
		con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
			if(err) throw err
			numberofcases = result[0].Anz
			console.log('TOMYSQL: Number of cases: '+numberofcases)
			if (numberofcases-booked >= cases) {
				console.log('Es ist eine Trennwand frei, die Reserviert werden kann.')
				console.log('TOMYSQL: Numberofcases: '+numberofcases+' Booked: '+booked+' Cases: '+cases+' Numberofcases-booked: '+(numberofcases-booked))

				for(var inserted = booked;inserted-booked<cases;inserted++){
					var tempstr = sqlStr+inserted+')'
					insertIntoDatabase(tempstr)
				}

			}else {
				console.log('Zu diesem Zeitpunkt ist leider nichts mehr frei.')
				console.log('TOMYSQL: Numberofcases: '+numberofcases+' Booked: '+booked+' Cases: '+cases+' Numberofcases-booked: '+(numberofcases-booked))
			}
		})
	})
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
