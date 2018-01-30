$(document).ready(function() {
  generateTable()
  $('.modal').modal({
    ready: function(modal, trigger){
      setValues()
    }
  })
})

function getColor(){
  return 'teal'
}

function setValues(){
  document.getElementById("myDate").valueAsDate = day[Math.floor(getId() / 10)]
  document.getElementById("myBeginnE").value = getId() % 10 + 1
}
