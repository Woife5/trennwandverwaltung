function setdate() {
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
  for(var i = 0;i<5;i++){
    document.getElementById("day"+i).innerHTML = day[i].toString().substring(0,15)
  }
  /*var date = new Date();

  date = new Date();
  var today = new Date(date);
  if (today.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (today.toString().substring(0, 3) == "Sun") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  today = new Date(date);
  today = today.toString();
  today = today.substring(0, 15);
  document.getElementById("today").innerHTML = today;

  date = new Date();
  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  if (tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (tomorrow.toString().substring(0, 3) == "Sun") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  tomorrow = tomorrow.toString();
  tomorrow = tomorrow.substring(0, 15);
  document.getElementById("tomorrow").innerHTML = tomorrow;

  date = new Date();
  var utomorrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  if (utomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (utomorrow.toString().substring(0, 3) == "Sun") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  utomorrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  utomorrow = utomorrow.toString();
  utomorrow = utomorrow.substring(0, 15);
  document.getElementById("utomorrow").innerHTML = utomorrow;

  date = new Date();
  var u2tomorrow = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (u2tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (u2tomorrow.toString().substring(0, 3) == "Sun") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  u2tomorrow = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  u2tomorrow = u2tomorrow.toString();
  u2tomorrow = u2tomorrow.substring(0, 15);
  document.getElementById("u2tomorrow").innerHTML = u2tomorrow;

  date = new Date();
  var u3tomorrow = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
  if (u3tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (u3tomorrow.toString().substring(0, 3) == "Sun") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  u3tomorrow = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
  u3tomorrow = u3tomorrow.toString();
  u3tomorrow = u3tomorrow.substring(0, 15);
  document.getElementById("u3tomorrow").innerHTML = u3tomorrow;
*/
}
