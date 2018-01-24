function getInfo() {
  var list = document.getElementsByClassName("toClear");
  for (var i = list.length - 1; 0 <= i; i--)
    if (list[i] && list[i].parentElement)
      list[i].parentElement.removeChild(list[i]);

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


  var Button = "<button class='getInfo btn waves-effect waves-light light-blue darken-4' title='Trennwand-Reservierung' id='";
  var Buttonv2 = "'>";
  var Buttonv3 = "</button>";

  var generator=
  "<div class='container toClear'>"+
  "<table>"+
  "<tr>"+
  "<th class=''><button type='button' name='neuerTermin' class='Popup btn btn-primary' title='Trennwand-Reservierung'>Neuer Termin</button></th>"+
  "<th class=''><button type='button' name='getKalender' onClick='getKalender()'  class='Info btn btn-primary'>Zum Kalender</button></th>"+
  "<th class=''></th>"+
  "<th class=''></th>"+
  "<th class=''></th>"+
  "</tr>"+
  "<tr>";
  for (var i = 0; i < 5; i++) {
    generator+="<th style='height:45px' class=''>" + day[i].toString().substring(0, 15) + "</th>"
  }
  generator+="</tr>"

  for (var i = 0; i < 10; i++) {
    generator+="<tr>";
    for (var j = 0; j < 5; j++) {
      generator+="<td style='width: 150px; text-align: right;'>" + Button + eval('i + SA * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + "</td>";

    }
    generator+="</tr>";
  }
  generator+="</table>";
  generator+="</div>";
  document.getElementById("master").innerHTML=generator;
}
