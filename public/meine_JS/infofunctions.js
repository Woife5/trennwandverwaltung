$(document).ready(function() {
  generateTable()
  $('.modal').modal({
    ready: function(modal, trigger) {
      buildInfoPopUp()
    }
  })
})

function getColor(){
  return 'blue'
}

function buildInfoPopUp() {
  let day = getDays()
  let dayNames = getDayNames()
  let tag = day[Math.floor(getId() / 10)]
  let n = dayNames[tag.getDay()];
  let tagoutput
  tagoutput = n + " dem " + tag.toLocaleDateString()
  let stunde = getId() % 10 + 1
  document.getElementById("myDate").innerHTML = tagoutput
  document.getElementById("myBeginnE").innerHTML = stunde

  getCases(function(cases){
    console.log(cases['numberofcases'])
  });

  let generator

  generator = "<ol>"
  for (let i = 0; i < 4; i++) {
    generator += "<li>" + "" + "</li>";
  }
  generator += "</ol>"

  document.getElementById('info').innerHTML = generator;
}
