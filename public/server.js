const express = require('express')
const app = express()
var router = express.Router()
var path = __dirname + '/public/'

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
	app.use(express.static('public'))
})

router.post("/",function(req,res){
	console.log('POST recieved')
})

app.use("/",router)

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})