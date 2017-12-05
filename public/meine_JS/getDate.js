function getdate() {
  var day = []
  var date = new Date()

  var j = 0;
  for(var i = 0;i<5;i++){
    day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
    if(day[i].toString().substring(0,3) == "Sat"){
      j+=2;
      day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
    }
    if(day[i].toString().substring(0,3) == "Sun"){
      j++;
      day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
    }
  }
  return day
}
