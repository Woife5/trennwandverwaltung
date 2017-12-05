
var SA = 10;
var day = []
var date = new Date()

var j = 0;
for(var i = 0;i<5;i++){
  day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
  if(day[i].toString().substring(0,3) == "Sat"){
    j+=2;
    day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
  }
  if(day[i].toString().substring(0,3) == "Sun"){
    j++;
    day[i]= new Date(date.getTime()+ j*24*3600*1000 + i*24*3600*1000)
  }
}


var Button = "<button class='btn btn-primary' title='Trennwand-Reservierung' id='";
var Buttonv2 = "'>";
var Buttonv3 ="</button>";

document.write("<table border='0'>");

document.write('<tr>');
for(var i=0;i<5;i++){
  document.write("<td style='width: 150px; text-align: center;'>"+day[i].toString().substring(0,15)+"</td>");
}
document.write('</tr>');

for (var i = 0; i < 10; i++) {
  document.write('<tr>');
  for (var j = 0; j < 5; j++) {
    document.write("<td style='width: 150px; text-align: right;'>" + Button + eval('i + SA * j') + Buttonv2 + eval('i % 10 +1') + Buttonv3 + "</td>");

  }
  document.write('</tr>');
}
document.write("</table>");
