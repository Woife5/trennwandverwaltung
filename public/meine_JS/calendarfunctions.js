function onload() {
  generateTable()
  $('.modal').modal()
  $('.collapsible').collapsible()
  getVergebenAufruf()
  let searchbar = document.getElementById('searchbar')
  searchbar.classList.add(getColor())
  let button = document.getElementById("submitbutton")
  button.classList.add("disabled")
  document.getElementById("myDate").valueAsDate = new Date()
}

let anzahl

function onSaved() {
  $('#modal').modal('close')
  getVergeben(getId(),60)
}

function getColor() {
  return 'teal'
}

function deleteHeader() {
  return '<th>Löschen</th>'
}

function activeTab(){
  return '<li class="active"><a href="#">Eintragen</a></li><li><a href="/info">Information</a></li><li><a href="/overview">Übersicht</a></li>'
}

function getVergebenAufruf() {
  let id
  let cnt = 1
  getCases(function(resp) {
    anzahl = resp.numberofcases
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 6; j++) {
        id = i + 10 * j
        getVergeben(id, cnt)
        cnt++
      }
    }
  })
}

function updateProgress(cnt){
  let percent = (cnt/60)*100
  document.getElementById('loadingTooltips').style.width = ''+percent+'%'
  if(percent == 100){
    document.getElementById('loadingCard').classList.add('hide')
    $('.tooltipped').tooltip({delay: 40})
  }
}

function getVergeben(id, cnt) {
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
    let toolTipText = reserv + '/' + anzahl + ' frei'
    elem=document.getElementById(id)
    elem.className+= " tooltipped"
    elem.setAttribute("data-position","bottom")
    elem.setAttribute("data-delay","40")
    elem.setAttribute("data-tooltip",toolTipText)
    if(reserv == 0){
      elem.classList.add('disabled')
    }
    updateProgress(cnt)
  })
}


function setValues() {
  let day = getDays()
  let aktday = day[Math.floor(getId() / 10)]
  let lesson = id % 10 + 1
  document.getElementById("myDate").valueAsDate = aktday
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

function checkform() {
  let f = document.forms['reserveform'].elements
  let cansubmit = true
  let lehrerid=document.getElementById("myTeacher").value

  for (let i = 0; i < f.length; i++) {
    if (f[i].value.length == 0)
      cansubmit = false
  }

  if (lehrerid.length > 25) {
    cansubmit = false
    if (teacherAlert) {
      Materialize.toast('Lehrername kann nicht länger als 25 Zeichen sein.', 5000, 'red')
      teacherAlert = false
    }
  } else {
    teacherAlert = true
  }
  
  if (document.getElementById("myClass").value.length > 10) {
    cansubmit = false
    if (classAlert) {
      Materialize.toast('Klassenname kann nicht länger als 10 Zeichen sein.', 5000,'red')
      classAlert = false
    }
  } else {
    classAlert = true
  }


  let button = document.getElementById("submitbutton")
  if (cansubmit) {
    button.classList.remove("disabled")
  } else {
    button.classList.add("disabled")
  }
  return cansubmit
}
