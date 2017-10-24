const express = require('express')
const app = express()
app.use(express.static('public'))
app.get("/",function(req,res){
	res.sendFile('index.html')
	console.log('GET')
})

app.post("/save",function(req,res){
	console.log('POST recived')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})