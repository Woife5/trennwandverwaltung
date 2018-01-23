function getKalender() {
  var SA = 10;
  var day = []
  var date = new Date()

  var j = 0;
  for (var i = 0; i < 5; i++) {
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
  var generator;

  var Button = "<button class='Popup btn btn-primary' title='Trennwand-Reservierung' id='";
  var Buttonv2 = "'>";
  var Buttonv3 = "</button>";

  generator =
    "<div class='container toClear'>" +
    "<table>" +
    "<tr>" +
    "<th class=''><button type='button' name='neuerTermin' class='Popup btn btn-primary' title='Trennwand-Reservierung'>Neuer Termin</button></th>" +
    "<th class=''><button type='button' name='getInfo' onClick='getInfo()' class='btn btn-primary getInfo'>Zur Info</button></th>" +
    "<th class=''></th>" +
    "<th class=''></th>" +
    "<th class=''></th>" +
    "</tr>" +
    "<tr>";
  for (var i = 0; i < 5; i++) {
    generator+="<th style='height:45px' class=''>" + day[i].toString().substring(0, 15) + "</th>";
  }
  generator+='</tr>';

  for (var i = 0; i < 10; i++) {
    generator+='<tr>';
    for (var j = 0; j < 5; j++) {
      generator+="<td style='width: 150px; text-align: right;'>" + Button + eval('i + SA * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + "</td>";

    }
    generator+='</tr>';
  }
  generator+="</table>";
  generator+="</div>"
  document.getElementById("master").innerHTML=generator;
}
