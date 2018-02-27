function onload() {
  generateTable(0)
  $('.modal').modal()
  $('.collapsible').collapsible()
  document.getElementById('prevWeek').classList.add('disabled')
  document.getElementById('prevWeekLarge').classList.add('disabled')
  getVergebenAufruf()
  let searchbar = document.getElementById('searchbar')
  searchbar.classList.add(getColor())
  let button = document.getElementById("submitbutton")
  button.classList.add("disabled")
  //document.getElementById("myDate").valueAsDate = new Date()

  $('.datepicker').pickadate({
    monthsFull: ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
    selectMonths: true,
    selectYears: 2,
    today: 'Heute',
    clear: 'Löschen',
    close: 'OK',
    min: new Date(),
    onClose: function(){
      checkform()
      checkInputDate()
    },
    closeOnSelect: false
  });

  picker=$('.datepicker').pickadate('picker')
  picker.set('select', new Date())

}
let picker
let anzahl

function getDateFromPicker(){
  return picker.get('select', 'yyyy-mm-dd')
}

function onSaved() {
  $('#modal').modal('close')
  getVergebenAufruf()
}

function getColor() {
  return 'teal'
}

function deleteHeader() {
  return '<th>Löschen</th>'
}

function deleteButton(id){
  return '<a onclick="deleteEintrag('+id+')" class="waves-effect waves-light"><i class="material-icons red-text">delete</i></a>'
}

function activeTab(){
  return '<li class="active"><a href="#">Eintragen</a></li><li><a href="/info">Information</a></li><li><a href="/overview">Übersicht</a></li>'
}

function getVergebenAufruf() {
  getCases(function(resp) {
    anzahl = resp.numberofcases
    for(let id=0;id<60;id++){
      getVergeben(id)
    }
  })
}

let stundenzeiten =[' 07:50-08:40',' 08:45-09:35',' 09:40-10:30',' 10:45-11:35',' 11:40-12:30',' 12:35-13:25',' 13:25-14:15',' 14:20-15:10',' 15:15-16:05',' 16:05-16:55']
function getVergeben(id) {
  let elem
  let day = getDays()
  let aktday = day[Math.floor(id / 10)]
  let year = aktday.getFullYear()
  let month = aktday.getMonth() + 1
  let tag = aktday.getDate()
  let lesson = id % 10 + 1
  getReserved(year, month, tag, lesson, function(response) {
    let reserv
    reserv = anzahl - response.length
    let toolTipText = reserv + '/' + anzahl + ' frei' + stundenzeiten[lesson-1]
    elem=document.getElementById(id)
    elem.className+= " tooltipped"
    elem.setAttribute("data-position","bottom")
    elem.setAttribute("data-delay","40")
    elem.setAttribute("data-tooltip",toolTipText)
    if(reserv == 0){
      elem.classList.add('disabled')
    }else{
      elem.classList.remove('disabled')
    }
    if(id == 59){
      $('.tooltipped').tooltip({delay: 40})
    }
  })
}


function setValues() {
  let day = getDays()
  let aktday = day[Math.floor(getId() / 10)]
  let lesson = id % 10 + 1
  //document.getElementById("myDate").valueAsDate = aktday
  picker.set('select', aktday)
  document.getElementById("myBeginnE").value = lesson
  let radios = document.getElementsByName('caseselect')
  let year = aktday.getFullYear()
  let month = aktday.getMonth() + 1
  let tag = aktday.getDate()

  for (var i = 0; i < radios.length; i++) {
    radios[i].removeAttribute("disabled")
    radios[i].checked = false
  }
  radios[0].checked = true

  getReserved(year, month, tag, lesson, function(response){
    let free = anzahl - response.length
    for (let i = radios.length-1; i>free-1; i--) {
      radios[i].setAttribute("disabled","disabled")
    }
  })
}

let teacherAlert = true
let classAlert = true
let submitbutton = document.getElementById("submitbutton")

function checkform() {
  let cansubmit = true
  let dateval = picker.get()
  let lessonval = document.getElementById("myBeginnE").value
  let teacherval = document.getElementById("myTeacher").value
  let classval = document.getElementById("myClass").value

  if (teacherval.length > 25) {
    cansubmit = false
    if (teacherAlert) {
      Materialize.toast('Lehrername kann nicht länger als 25 Zeichen sein.', 5000, 'red')
      teacherAlert = false
    }
  } else {
    teacherAlert = true
  }
  if(teacherval.length == 0){
    cansubmit = false
  }

  if (classval.length > 10) {
    cansubmit = false
    if (classAlert) {
      Materialize.toast('Klassenname kann nicht länger als 10 Zeichen sein.', 5000,'red')
      classAlert = false
    }
  } else {
    classAlert = true
  }
  if(classval.length == 0){
    cansubmit = false
  }

  if(lessonval.length == 0){
    cansubmit=false
  }

  if(!dateval){
    cansubmit=false
  }

  if (cansubmit) {
    submitbutton.classList.remove("disabled")
  } else {
    submitbutton.classList.add("disabled")
  }
  return cansubmit
}

function checkInputDate(){
  let radios = document.getElementsByName('caseselect')
  let input = new Date(getDateFromPicker())
  let year = input.getFullYear()
  let month = input.getMonth() + 1
  let day = input.getDate()
  let lesson = document.getElementById('myBeginnE').value

  for (var i = 0; i < radios.length; i++) {
    radios[i].removeAttribute("disabled")
    radios[i].checked = false
  }
  radios[0].checked = true

  getReserved(year, month, day, lesson, function(data){
    let free = anzahl - data.length
    for (let i = radios.length-1; i>free-1; i--) {
      radios[i].setAttribute("disabled","disabled")
    }
  })
}
