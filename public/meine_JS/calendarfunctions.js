$(document).ready(function() {
  generateTable()
  $('.modal').modal()
  let button = document.getElementById("submitbutton")
  button.classList.add("disabled")
})

function getColor(){
  return 'teal'
}

function setValues(){
  document.getElementById("myDate").valueAsDate = day[Math.floor(getId() / 10)]
  document.getElementById("myBeginnE").value = getId() % 10 + 1
}

function checkform(){
  var f = document.forms['reserveform'].elements
  var cansubmit = true

  for (var i = 0; i < f.length; i++) {
    if (f[i].value.length == 0)
      cansubmit = false
  }

  let button = document.getElementById("submitbutton")
  if(cansubmit){
    button.classList.remove("disabled")
  }else{
    button.classList.add("disabled")
  }
}
