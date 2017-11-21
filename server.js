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

	var sql

	con.connect(function(err) {
		if (err) throw err
		console.log('Connected to GET')
		con.query('SELECT twfk FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
	    if (err) throw err
			sql = toMySql(date, lesson, duration, cases, teacher, schoolclass, result)
			console.log(sql)
			con.query(sql, function(err, result){
				if(err) throw err
				console.log('New Values secessfully inserted')
			})
		})

	})
})

// Actual function that does all the calculating
// Not finished; just for debugging
function toMySql(date, lesson, duration, cases, teacher, schoolclass, result){
	var sqlStr = 'INSERT INTO entlehnt VALUES '
	sqlStr += '(null,"'+teacher+'","'+schoolclass+'","'+date+'",'+lesson+','+duration+','

	if(result == ''){
		sqlStr += '1)'
		return sqlStr
	}
}

app.listen(8000, function () {
  console.log('Webserver listening on port 8000!')
})
