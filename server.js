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
  database: 'Wolfgang_twv',
	dateStrings: true
})

con.connect(function(err){
	if (err) throw err
})

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/new',function(req, res){
	res.redirect('/calendar')
})

app.get('/',function(req, res){
	res.redirect('/calendar')
})

app.get('/calendar',function(req, res){
	res.sendFile(path.join(__dirname ,'public','calendar.html'))
})

app.get('/info',function(req, res){
	res.sendFile(path.join(__dirname ,'public','information.html'))
})

app.get('/overview', function(req, res){
	res.sendFile(path.join(__dirname ,'public','overview.html'))
})

app.get('/api/:year/:month/:day/:lesson', function(req, res){
	let date = ''+req.params.year+'-'+req.params.month+'-'+req.params.day
	let lesson = req.params.lesson
	con.query('SELECT teachername, class as klasse, twfk as trennwand, name from entlehnt JOIN trennwaende ON entlehnt.twfk=trennwaende.ID where date="'+date+'" and lesson='+lesson,function(err, result, fields){
		if(err) throw err
		res.json(result)
		return
	})
})

app.get('/api/teacher/:teacher',function(req, res){
	let name = req.params.teacher
	con.query('SELECT entlehnt.ID,teachername, date, lesson, class as klasse, name as twname, twfk from entlehnt JOIN trennwaende ON entlehnt.twfk=trennwaende.ID where DATE_ADD(date, INTERVAL 1 HOUR) > CURDATE() AND teachername ="'+name+'" order by date ASC, lesson ASC', function(err, result, fields){
		if(err){
			let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
			res.status(400).json(error)
			return
		}
		res.json(result)
		return
	})
})

app.get('/api/cases', function(req, res) {
	let cases
	con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
		if(err){
			let error = {error:3,errordata:err, userdesc:'Eine SQL Abfrage schlug fehl.'}
			res.status(400).json(error)
			return
		}
		cases = result[0].Anz
		con.query('SELECT * from trennwaende',function(err, result, fields){
			if(err){
				let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
				res.status(400).json(error)
				return
			}
			let ret = {numberofcases:cases}
			for (let i = 0; i < cases; i++) {
				ret[i] = result[i].name
			}
			res.json(ret)
			return
		})
	})
})

app.delete('/api/delete/:id',function(req, res){
	let id = req.params.id
	con.query('SELECT ID, teachername, class, date, lesson, twfk from entlehnt where ID='+id, function(err, result, fields){
		if (err){
			let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
			res.status(400).json(error)
			return
		}else if(!result){
			let error = {error:0,errordata:err,userdesc:'Dieser Eintrag wurde nicht gefunden.'}
			res.status(400).json(error)
			return
		}else{
			con.query('DELETE FROM entlehnt where `ID`='+id, function(err, delresult){
				if (err){
					let error = {error:3,errordata:err,userdesc:'Löschen fehlgeschlagen.'}
					res.status(400).json(error)
					return
				}else{
					res.status(200).json(result)
				}
			})
		}
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

	con.query('SELECT DATEDIFF("'+date+'",CURDATE()) as tocheck',function(err, result, fields){
		if(err){
			let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
			res.status(400).json(error)
			return
		}
		if(result[0].tocheck < 0){
			let notallowed = {error:-1, errortxt:'bad date',errordesc:'The user requested a date beore today.',userdesc:'Bitte geben sie ein gültiges Datum ein. Daten vor dem heutigen sind nicht gültig.'}
			res.status(400).json(notallowed)
			return
		}
		toMySql(date, lesson, cases, teacher, schoolclass, function(error, data) {
			if(error){
				res.status(400).json(error)
				return
			}
			res.json(data)
			return
		})
	})
})

//------------------------------------------------------------------------------Actual function that does all the calculating
function toMySql(date, lesson, cases, teacher, schoolclass, callback){
	let avalible
	con.query('SELECT count(*) as booked FROM entlehnt where `date`="'+date+'" AND lesson='+lesson, function (err, result, fields) {
    if (err) {
			let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
			callback(error, null)
		}
		let booked = result[0].booked
		con.query('SELECT count(*) as Anz from trennwaende', function(err, result, fields){
			if (err) {
				let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
				callback(error, null)
			}
			numberofcases = result[0].Anz
			avalible = numberofcases-booked
			if(cases > numberofcases){
				//----------------------------------------------------------------------Someone tried to reserve more cases than avalible
				let err
				if(avalible == 0){
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandkoffer vorhanden, wovon keine mehr frei ist zu diesem Termin.'}
				}else if(avalible == 1){
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandkoffer vorhanden, wovon eine noch frei ist zu diesem Termin.'}
				}else{
					err = {error:42, errortxt:'not that many!',errordesc:'The user requested more cases than avalible.',userdesc:'Es sind maximal '+numberofcases+' Trennwandkoffer vorhanden, wovon '+avalible+' noch frei sind zu diesem Termin.'}
				}
				callback(err, null)
			}else if (avalible >= cases) {
				//----------------------------------------------------------------------There are enough cases to reserve
				con.query('SELECT twfk from entlehnt where `date`="'+date+'" AND lesson='+lesson,function(err, result, fields){
					if(err){
						let error = {error:3,errordata:err,userdesc:'Eine SQL Abfrage schlug fehl.'}
						callback(error, null)
					}
					let taken = []
					for (let i = 0; i < numberofcases; i++) {
						taken[i] = false
					}
					for (let i = 0; i < result.length; i++) {
						taken[result[i].twfk] = true
					}

					let sql = 'INSERT INTO entlehnt (ID, teachername, class, date, lesson, twfk) VALUES ?'
				  let values = []

					let j = 0
					let reserved = 0
					for (let i = 0; i < numberofcases; i++) {
						if(!taken[i]){
							values[j] = ['null', teacher, schoolclass, date, lesson, i]
							reserved++
							j++
						}
						if(reserved >= cases){
							break
						}
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
					})
			}else if(avalible == 0){
				//----------------------------------------------------------------------None are free
				let err = {error:0, errortxt:'no free',errordesc:'No cases free.',userdesc:'Zu diesem Zeitpunkt sind keine Trennwandkoffer mehr frei.'}
				callback(err, null)
			}else{
				//----------------------------------------------------------------------Not that many are free anymore
				let err = {error:5, errortxt:'nothing to reserve',errordesc:'The user requested more cases than free.',userdesc:'Zu diesem Zeitpunkt sind nurmehr '+avalible+' Trennwandkoffer frei.'}
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
