$(document).ready(function() {
  generateTable()
  $('.modal').modal()
})

function getColor() {
  return 'blue'
}

function setValues() {
  let day = getDays()
  let dayNames = getDayNames()
  let tag = day[Math.floor(getId() / 10)]
  let n = dayNames[tag.getDay()];
  let tagoutput
  tagoutput = n + " dem " + tag.toLocaleDateString()
  let stunde = getId() % 10 + 1
  document.getElementById("myDate").innerHTML = tagoutput
  document.getElementById("myBeginnE").innerHTML = stunde
  let generator
  getCases(function(cases) {
    getReserved(2018, 1, 30, 1, function(reserviert) {
      console.log(cases['numberofcases'])
      console.log(reserviert);

      generator = "<ol>"
      for (let i = 0; i < cases['numberofcases']; i++) {
        generator += "<li>" + cases[i] + ": "
        "</li>";
      }
      generator += "</ol>"
      document.getElementById('info').innerHTML = generator;
    })
  });
}
