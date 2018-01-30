let id
let dayNames = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']

function klick(number){
  id = number;
  console.log('Setze id auf: '+number)
  setValues()
  return false
}

let day = []
let date = new Date()

let j = 0;
for (let i = 0; i < 6; i++) {
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

function generateTable(){
  let Button = '<a href="#modal" onclick="return klick('
  let Buttonv2 = ')" class="btn '+getColor()+' waves-effect waves-light">'
  let Buttonv3 = '</a>'
  let generator = ''
  generator += getDayRow()
  //generator += '<div class="row"></div>'

  for (let i = 0; i < 10; i++) {
    generator += '<div class="row">';
    for (let j = 0; j < 6; j++) {
      generator += '<div class="col s2">' + Button + eval('i + 10 * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + '</div>'

    }
    generator += '</div>'
  }
  document.getElementById('myDiv').innerHTML = generator;
}

function getDayRow(){
  let dayList = ''
  let dayv1 = '<div class="col s2 card-panel '+getColor()+' center-align white-text"><font size="5">'
  let dayv2 = '</font></div>'
  dayList += '<div class="row" style="margin: 0px">'

  for (let i = 0; i < day.length; i++) {
    dayList += dayv1 + dayNames[day[i].getDay()] + dayv2
  }

  dayList += '</div>'
  return dayList
}

function getId(){
  return id
}

function getDayNames(){
  return dayNames
}

function getDays(){
  return day
}
