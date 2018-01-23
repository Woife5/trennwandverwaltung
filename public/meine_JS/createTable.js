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

  var Button = "<button class='Popup waves-effect waves-light btn' title='Trennwand-Reservierung' id='";
  var Buttonv2 = "'>";
  var Buttonv3 = "</button>";

  generator =
    "<div class='container toClear'>" +
    "<table>" +
    "<tr>" +
    "<th class=''><button type='button' name='neuerTermin' class='Popup waves-effect waves-light btn' title='Trennwand-Reservierung'>Neuer Termin</button></th>" +
    "<th class=''><button type='button' name='getInfo' id='getInfo' onClick='getInfo()' class='Popup waves-effect waves-light btn'>Zur Information</button></th>" +
    "<th class=''></th>" +
    "<th class=''></th>" +
    "<th class=''></th>" +
    "</tr>" +
    "<tr>";
  for (var i = 0; i < 5; i++) {
    generator += "<th style='height:45px' class=''>" + day[i].toString().substring(0, 15) + "</th>";
  }
  generator += '</tr>';

  for (var i = 0; i < 10; i++) {
    generator += '<tr>';
    for (var j = 0; j < 5; j++) {
      generator += "<td style='width: 150px; text-align: right;'>" + Button + eval('i + SA * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + "</td>";

    }
    generator += '</tr>';
  }
  generator += "</table>";
  generator += "</div>"
  document.getElementById("master").innerHTML = generator;
  loadPopUp();
}

function loadPopUp() {

  $(".Popup").on("click", function() {
    console.log($(this).text());
  });
  $('.Popup').click(function() {
    $('.Popup').not(this).popover('hide');
    $(this).popover({
      title: "Das ist ein Header",
      content: '<form onsubmit="formsubmit(this);return false"><div class="input-field col s6"><input id="myDate" type="date" class="validate"><label class="active" for="myDate">Datum</label></div><div class="input-field col s6"><input id="myBeginnE" type="number" name="BeginnE" class="validate"><label class="active" for="myBeginnE">Einheit</label></div><div class="input-field col s6"><input id="myAnzahlKoffer" type="number" name="AnzahlKoffer" class="validate"><label for="myAnzahlKoffer">Anzahl Koffer</label></div><div class="input-field col s6"><input id="myTeacher" type="text" class="validate" name="LehrerKzl"><label for="myTeacher">Lehrer</label></div><div class="input-field col s6"><input id="myClass" type="text" class="validate" name="Klasse"><label for="myClass">Klasse</label></div><button class="btn waves-effect waves-light" type="submit" name="action">Submit<i class="material-icons right">send</i></button></form>',
      html: true,
      trigger: "click",
      toggle: "popover",
      container: ".container"
    })
  })
  $('.Popup').on('shown.bs.popover', function() {
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
    document.getElementById("myDate").valueAsDate = day[Math.floor(this.id / 10)]
    document.getElementById("myBeginnE").value = this.id % 10 + 1
  })



}
