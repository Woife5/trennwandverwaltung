let week = 0

$(document).ready(function() {

  if(!checkInput('date')){
    let errtext = ''
    errtext += '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8" /><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-alpha.3/css/materialize.css"><title>Trennwand Reservierung</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'
    errtext += '<body>'
    errtext += '<div class="container">'
    errtext += '<h1>This is an Error.</h1>'
    errtext += '<blockquote style="font-size:20px;">We are sorry but this website does not support your browser.<br>At the time of coding this page only the following browsers support all of the nececary methods, so please use one of them:</blockquote>'
    errtext += '<ul style="font-size:20px;" class="collection"><li class="collection-item">Google Chrome (v25+)</li><li class="collection-item">Mozilla Firefox (v57+)</li><li class="collection-item">Microsoft Edge (v12+)</li><li class="collection-item">Opera (v10.1+)</li></ul>'
    errtext += '<div>'
    errtext += '</body>'
    document.write(errtext)
    return
  }
  navBar()
  onload()
  writeAutofill()
})

function checkInput(type) {
  var input = document.createElement("input")
  input.setAttribute("type", type)
  return input.type == type
}

let id
let dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
let dayNamesShort = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function klick(number) {
  id = number;
  setValues()
  return false
}

let day = []
let date = new Date()


function navBar() {
  let gen = ''
  gen += '<nav class="' + getColor() + ' navbar-material darken-3"><div class="nav-wrapper"><a href="/calendar" class="brand-logo right"><img class="responsive-img" src="/Images/HTL-Logo-weiss-transparent.png"></a><ul id="nav-mobile" class="left">' + activeTab() + '</ul></div></nav>'
  document.getElementById('navDiv').innerHTML = gen;
}

function generateTable(showweek) {
  let Button = '<a href="#modal" onclick="return klick('
  let Buttonv3 = '</a>'
  let generator = ''
  let id
  generator += getDayRow(showweek)
  //generator += '<div class="row"></div>'

  for (let i = 0; i < 10; i++) {
    generator += '<div class="row">';
    for (let j = 0; j < 6; j++) {
      id = i + 10 * j
      generator += '<div class="col s2">' + Button + id + ')"' + 'id="' + id + '"' + '  class="' + getColor() + ' waves-effect waves-light btn"' + '>' + eval('i + 1') + Buttonv3 + '</div>'
    }
    generator += '</div>'
  }
  document.getElementById('myDiv').innerHTML = generator;
}

function getDayRow(showweek) {

  let dayList = ''
  let dayv1 = '<div class="col s2 card-panel ' + getColor() + ' center-align white-text"><font size="5">'
  let dayv2 = '</font></div>'

  datumsberechnung(showweek)

  dayList += '<div class="row" style="margin: 0px">'
  for (let i = 0; i < day.length; i++) {
    dayList += '<div class="hide-on-med-and-down show-on-large">' + dayv1 + "<font size='3'>" + day[i].toLocaleDateString() + "</font>" + "<br>" + dayNames[day[i].getDay()] + dayv2 + '</div>'
  }

  dayList += '</div>'
  dayList += '<div class="row" style="margin: 0px">'
  for (let i = 0; i < day.length; i++) {
    dayList += '<div class="show-on-med-and-down hide-on-large-only">' + dayv1 + "<font size='3'>" + day[i].toLocaleDateString().substring(0, day[i].toLocaleDateString().length - 4) + "</font>" + "<br>" + dayNamesShort[day[i].getDay()] + dayv2 + '</div>'
  }

  dayList += '</div>'
  return dayList

}

function getId() {
  return id
}

function getDayNames() {
  return dayNames
}

function getDays() {
  return day
}

let classes = {}
let klassen = {}

function searchresult(data) {
  classes = {}
  klassen = {}
  for (var i = 0; i < data.length; i++) {
    if (klassen[data[i].klasse]) {
      classes[data[i].klasse].push({
        'id': data[i].ID,
        'date': new Date(data[i].date.substring(0, 10)),
        'lesson': data[i].lesson,
        'twname': data[i].twname,
        'twfk': data[i].twfk,
        'teachername': data[i].teachername
      })
    } else {
      classes[data[i].klasse] = [{
        'id': data[i].ID,
        'date': new Date(data[i].date.substring(0, 10)),
        'lesson': data[i].lesson,
        'twname': data[i].twname,
        'twfk': data[i].twfk,
        'teachername': data[i].teachername
      }]
      klassen[data[i].klasse] = true
    }
  }
  if (Object.keys(klassen).length == 0) {
    document.getElementById('sercontent').innerHTML = '<h1 class="' + getColor() + '-text">Keine Einträge gefunden!</h1>'
    return
  }
  let searchcontent = '<br>'
  searchcontent += '<ul class="collapsible" data-collapsible="accordion">'

  let klassev1 = '<div class="collapsible-header"><i class="material-icons">account_box</i>'
  let tablehead = '<table class="responsive-table"><thead><tr><th>Datum</th><th>Einheit</th><th>Trennwand</th>' + deleteHeader() + '</tr></thead>'

  for (let i = 0; i < Object.keys(klassen).length; i++) {
    searchcontent += '<li>'
    searchcontent += '' + klassev1 + Object.keys(klassen)[i] + '</div>' + '<div class="collapsible-body">'
    searchcontent += '' + tablehead + '<tbody>'
    //console.log(classes[Object.keys(klassen)[i]])
    for (let j = 0; j < classes[Object.keys(klassen)[i]].length; j++) {
      searchcontent += '<tr>'
      searchcontent += '<td>' + dayNamesShort[classes[Object.keys(klassen)[i]][j].date.getDay()] + ', ' + classes[Object.keys(klassen)[i]][j].date.toLocaleDateString() + '</td>'
      searchcontent += '<td>' + classes[Object.keys(klassen)[i]][j].lesson + '</td>'
      searchcontent += '<td>' + classes[Object.keys(klassen)[i]][j].twname + '</td>' //Seitenspezifisch
      searchcontent += '<td>' + deleteButton(classes[Object.keys(klassen)[i]][j].id) + '</td>'
      searchcontent += '</tr>'
    }
    searchcontent += '</tbody>'
    searchcontent += '</li>'
    searchcontent += '</table>' + '</div>'
  }
  searchcontent += '</ul>'
  document.getElementById('sercontent').innerHTML = searchcontent
  $('.collapsible').collapsible()
}

function getClasses() {
  return classes
}

function getKey() {
  return klassen
}

function datumsberechnung(showweek) {
  let j = 0;
  for (let i = 0; i < 6; i++) {
    day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000 + showweek * 7 * 24 * 3600 * 1000)
    if (day[i].getDay() == 6) {
      j += 2;
      day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000 + showweek * 7 * 24 * 3600 * 1000)
    }
    if (day[i].getDay() == 0) {
      j++;
      day[i] = new Date(date.getTime() + j * 24 * 3600 * 1000 + i * 24 * 3600 * 1000 + showweek * 7 * 24 * 3600 * 1000)
    }
  }
  let weektext = ''
  let weektextsmall=''
  if (day[0].getFullYear() == day[day.length - 1].getFullYear()) {
    if (day[0].getMonth() == day[day.length - 1].getMonth()) {
      weektext += day[0].getDate() + " - " + day[day.length - 1].getDate() + " " + monthNames[day[0].getMonth()]
    } else {
      weektext += day[0].getDate() + " " + monthNames[day[0].getMonth()] + " - " + day[day.length - 1].getDate() + " " + monthNames[day[day.length - 1].getMonth()]
    }
    weektextsmall=weektext
    weektext += ", " + day[0].getFullYear()
  }
  else{
    weektextsmall+= day[0].getDate() + " " + monthNames[day[0].getMonth()] + " - " + day[day.length - 1].getDate() + " " + monthNames[day[day.length - 1].getMonth()]
    weektext += day[0].getDate() + " " + monthNames[day[0].getMonth()] + ", "
    weektext += day[0].getFullYear() + " - " + day[day.length - 1].getDate() + " " +monthNames[day[day.length - 1].getMonth()]  + ", "
    weektext += day[day.length-1].getFullYear()
  }
  console.log(weektext);
  document.getElementById('weektextsmall').innerHTML=weektextsmall
  document.getElementById('weektextlarge').innerHTML=weektext
}

function nextWeek() {
  week += 1
  generateTable(week)
  getVergebenAufruf()
}

function prevWeek() {
  week -= 1
  generateTable(week)
  getVergebenAufruf()
}

function thisWeek() {
  week = 0
  generateTable(week)
  getVergebenAufruf()
}

function writeAutofill(){
  classesFromDB(function(resClasses){
    $('input.autocompleteKlasse').autocomplete({
     data: resClasses,
     onAutocomplete: function(val) {
        checkform()
      },
     minLength: 0,
    });
  })
  teacherFromDB(function(resLehrer){
    $('input.autocompleteLehrer').autocomplete({
     data: resLehrer,
     onAutocomplete: function(val) {
        checkform()
      },
     minLength: 0,
    });
  })



}
