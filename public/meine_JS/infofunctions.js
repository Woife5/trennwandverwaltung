function onload(){
  console.log('Onload infofunctions')
}

function getColor() {
  return 'blue'
}

function deleteHeader(){
  return ''
}

function deleteButton(){
  return ''
}
function getVergebenAufruf(){
  return ''
}

function activeTab(){
  return '<li><a href="/calendar">Eintragen</a></li><li class="active"><a href="#">Information</a></li>'
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
    getReserved(tag.getFullYear(), tag.getMonth() + 1, tag.getDate(), stunde, function(reserviert) {
      console.log(cases['numberofcases'])


      generator = "<table class='responsive-table'>"
      generator += "<thead> <tr>  <th>Farbe</th> <th>Lehrer</th> </tr> </thead>"
      generator += "<tbody>"
      let i=0;
      for (; i < reserviert.length; i++) {
        generator += "<tr>" + "<td>" + cases[i] + "</td>" +  "<td>" + reserviert[i].teachername + "</td>" + "</tr>";
      }


      for (let j=0; j < cases['numberofcases']-reserviert.length; j++,i++) {
        generator += "<tr>" + "<td>" + cases[i] + "</td>" +  "<td>" +  + "</td>" + "</tr>";
      }
      generator += "</tbody>"
      generator += "</table>"
      document.getElementById('info').innerHTML = generator;
    })
  });
}
