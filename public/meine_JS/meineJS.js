function getdate(){
	var date = new Date();
//use the constructor to create by milliseconds
	var today = new Date(date.getTime());
	today=today.toString();
	today=today.substring(0,15);
 document.getElementById("today").innerHTML = today;

 var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
	tomorrow=tomorrow.toString();
	tomorrow=tomorrow.substring(0,15);
 document.getElementById("tomorrow").innerHTML = tomorrow;

 var Ütomorrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
	Ütomorrow=Ütomorrow.toString();
	Ütomorrow=Ütomorrow.substring(0,15);
 document.getElementById("Ütomorrow").innerHTML = Ütomorrow;

 var Ü2tomorrow = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
	Ü2tomorrow=Ü2tomorrow.toString();
	Ü2tomorrow=Ü2tomorrow.substring(0,15);
 document.getElementById("Ü2tomorrow").innerHTML = Ü2tomorrow;

 var Ü3tomorrow = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
	Ü3tomorrow=Ü3tomorrow.toString();
	Ü3tomorrow=Ü3tomorrow.substring(0,15);
 document.getElementById("Ü3tomorrow").innerHTML = Ü3tomorrow;

}
