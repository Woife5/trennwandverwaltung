$(document).ready(function() {
  generateTable()
  $('.modal').modal()
  $('.collapsible').collapsible()
  let searchbar = document.getElementById('searchbar')
  searchbar.classList.add(getColor())
  let navbar = document.getElementById('navcolor')
  navbar.classList.add(getColor())
  onload()
})

let id
let dayNames = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']
let dayNamesShort = ['So','Mo','Di','Mi','Do','Fr','Sa']
function klick(number){
  id = number;
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
      generator += '<div class="col s2">' + Button + eval('i + 10 * j') + Buttonv2 + eval('i + 1') + Buttonv3 + '</div>'
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
    dayList += '<div class="hide-on-med-and-down show-on-large ">'+dayv1+"<font size='3'>"+day[i].toLocaleDateString()+"</font>" +"<br>"+ dayNames[day[i].getDay()] + dayv2+'</div>'
  }

  dayList += '</div>'
    dayList += '<div class="row" style="margin: 0px">'
    for (let i = 0; i < day.length; i++) {
      dayList += '<div class="show-on-med-and-down hide-on-large-only">'+ dayv1+"<font size='3'>"+day[i].toLocaleDateString().substring(0,day[i].toLocaleDateString().length-4)+"</font>" +"<br>"+ dayNamesShort[day[i].getDay()] + dayv2+'</div>'
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

let classes = {}
let klassen = {}

function searchresult(data){
  classes = {}
  klassen = {}
  for (var i = 0; i < data.length; i++) {
    if(klassen[data[i].klasse]){
      classes[data[i].klasse].push({'date':new Date(data[i].date.substring(0,10)), 'lesson':data[i].lesson,'twname':data[i].twname,'twfk':data[i].twfk,'teachername':data[i].teachername})
    }else{
      classes[data[i].klasse] = [{'date':new Date(data[i].date.substring(0,10)), 'lesson':data[i].lesson,'twname':data[i].twname,'twfk':data[i].twfk,'teachername':data[i].teachername}]
      klassen[data[i].klasse] = true
    }
  }
  if(Object.keys(klassen).length == 0){
    document.getElementById('sercontent').innerHTML = '<h1 class="'+getColor()+'-text">Keine Einträge gefunden!</h1>'
    return
  }
  let searchcontent = '<br>'
  searchcontent += '<ul class="collapsible" data-collapsible="accordion">'

  let klassev1 = '<div class="collapsible-header"><i class="material-icons">account_box</i>'
  let tablehead = '<table class="responsive-table"><thead><tr><th>Datum</th><th>Einheit</th><th>Trennwand</th>'+deleteHeader()+'</tr></thead>'

  for (let i = 0; i < Object.keys(klassen).length; i++) {
    searchcontent += '<li>'
    searchcontent += ''+klassev1 + Object.keys(klassen)[i] + '</div>' + '<div class="collapsible-body">'
    searchcontent += ''+tablehead + '<tbody>'
    for (let j = 0; j < classes[Object.keys(klassen)[i]].length; j++) {
      searchcontent += '<tr>'
      searchcontent += '<td>' + classes[Object.keys(klassen)[i]][j].date.toLocaleDateString() + '</td>'
      searchcontent += '<td>' + classes[Object.keys(klassen)[i]][j].lesson + '</td>'
      searchcontent += '<td>' + classes[Object.keys(klassen)[i]][j].twname + '</td>'
      searchcontent += '<td>' + deleteButton(i,j) + '</td>'
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
function ondeleteconfirm(i,j){
  document.getElementById('deleteconf').innerHTML='<a href="#!"onclick="deleteEintrag('+i+','+j+')"  class="modal-action modal-close waves-effect waves-green btn-flat ">Ja</a>  <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Nein</a>'
}
function getClasses(){
  return classes
}
function getKey(){
  return klassen
}
