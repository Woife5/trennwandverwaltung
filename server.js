const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.get("/",function(req,res){
	res.sendFile('index.html')
})

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)

app.post('/save',urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400)
	console.log(req.body)
  res.send(req.body)
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
