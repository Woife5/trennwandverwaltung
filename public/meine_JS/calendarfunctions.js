$(document).ready(function() {
  generateTable()
  $('.modal').modal({
    ready: function(modal, trigger){
      setValues()
    }
  })
})
var id
var dayNames = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']

function klick(number){
  id = number;
  console.log('Setze id auf: '+number)
  return false
}
var day = []
var date = new Date()

var j = 0;
for (var i = 0; i < 6; i++) {
  day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000)
  if (day[i].toString().substring(0, 3) == "Sat") {
    j += 2;
    day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000)
  }
  if (day[i].toString().substring(0, 3) == "Sun") {
    j++;
    day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000)
  }
}
function setValues(){
  document.getElementById("myDate").valueAsDate = day[Math.floor(id / 10)]
  document.getElementById("myBeginnE").value = id % 10 + 1
}
function getDayRow(){
  let dayList = ''
  let dayv1 = '<div class="col s2 card-panel teal center-align white-text"><font size="5">'
  let dayv2 = '</font></div>'
  dayList += '<div class="row" style="margin: 0px">'

  for (var i = 0; i < day.length; i++) {
    dayList += dayv1 + dayNames[day[i].getDay()] + dayv2
  }

  dayList += '</div>'
  return dayList
}
function generateTable(){
  let Button = '<a href="#modal" onclick="return klick('
  let Buttonv2 = ')" class="btn waves-effect waves-light">'
  let Buttonv3 = '</a>'
  let SA = 10
  let generator = ''
  generator += getDayRow()
  //generator += '<div class="row"></div>'

  for (let i = 0; i < 10; i++) {
    generator += '<div class="row">';
    for (let j = 0; j < 6; j++) {
      generator += '<div class="col s2">' + Button + eval('i + SA * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + '</div>'

    }
    generator += '</div>'
  }
  document.getElementById('myDiv').innerHTML = generator;
}
