function onload(){
  let button = document.getElementById("submitbutton")
  button.classList.add("disabled")
  document.getElementById("myDate").valueAsDate = new Date()
}

function onSaved(){
  $('#modal').modal('close')
}

function getColor(){
  return 'teal'
}

function deleteHeader(){
  return '<th>Löschen</th>'
}

function deleteButton(i,j){
  return '<a href="#deleteBut" onclick="ondeleteconfirm('+i+','+j+')" class="waves-effect waves-light"><i class="material-icons red-text">delete</i></a>'
}

function activeTab(){
  return '<li class="active"><a href="#">Eintragen</a></li><li><a href="/info">Information</a></li>'
}

function setValues(){
  document.getElementById("myDate").valueAsDate = day[Math.floor(getId() / 10)]
  document.getElementById("myBeginnE").value = getId() % 10 + 1
}

let teacherAlert = true
let classAlert = true

function checkform(){
  let f = document.forms['reserveform'].elements
  let cansubmit = true

  for (let i = 0; i < f.length; i++) {
    if (f[i].value.length == 0)
      cansubmit = false
  }

  if(document.getElementById("myTeacher").value.length > 25){
    cansubmit = false
    if(teacherAlert){
      Materialize.toast('Lehrername kann nicht länger als 25 Zeichen sein.', 5000)
      teacherAlert = false
    }
  }else{
    teacherAlert = true
  }

  if(document.getElementById("myClass").value.length > 10){
    cansubmit = false
    if(classAlert){
      Materialize.toast('Klassenname kann nicht länger als 10 Zeichen sein.', 5000)
      classAlert = false
    }
  }else{
    classAlert = true
  }


  let button = document.getElementById("submitbutton")
  if(cansubmit){
    button.classList.remove("disabled")
  }else{
    button.classList.add("disabled")
  }
  return cansubmit
}
