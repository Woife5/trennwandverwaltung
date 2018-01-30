$(document).ready(function() {
  generateTable()
  $('.modal').modal()
  $('.collapsible').collapsible()
  let button = document.getElementById("submitbutton")
  button.classList.add("disabled")
})

function searchresult(data){
  let classes = {}
  for (var i = 0; i < data.length; i++) {
    console.log('Klasse: '+data[i].klasse+' Datum: '+data[i].date+' Stunde: '+data[i].lesson+' TWFK: '+data[i].twfk)
    //Continue Here!
  }
  console.log(classes);
  let deletecontent = ''
  deletecontent += '<ul class="collapsible" data-collapsible="accordion">'
  	/*
    <li>
      <div class="collapsible-header"><i class="material-icons">account_box</i>Erste Klasse</div>
      <div class="collapsible-body">
        <table class='responsive-table'>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Einheit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>20.1.2018</td>
              <td>5</td>
            </tr>
            <tr>
              <td>23.2.2018</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
    */
  deletecontent += '</ul>'
  //document.getElementById('deletecontent').innerHTML = deletecontent
}

function getColor(){
  return 'teal'
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
}
