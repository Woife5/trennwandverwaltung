int SA = 10;


var Button = '<button class="btn btn-primary" title="Trennwand-Reservierung" id="';
var Buttonv2 = '">1</button>';

document.write('<table border="0">');
document.write("<tr><td style='width: 100px; color: red;'>Col Head 1</td>");
document.write("<td style='width: 100px; color: red; text-align: right;'>Col Head 2</td>");
document.write("<td style='width: 100px; color: red; text-align: right;'>Col Head 3</td></tr>");

for (var i = 0; i < 10; i++) {
  document.write("<tr><td style='width: 100px;'>Number " + i + " is:</td>");
  myArray[i] = myArray[i].toFixed(3);

  for (var j = 0; j < 5; j++) {
    document.write("<td style='width: 100px; text-align: right;'>" + Button + eval('i + SA * j') + Buttonv2 + "</td>");

  }
}
document.write("</table>");
