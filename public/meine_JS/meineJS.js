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
 
	
}
function myFu(){
	/*var today = new Date(date.getTime());
	today=today.toString();
	today=today.substring(0,15);
	switch(today.substring(4,7)) {
		case "Jan":
			var todayowt=today.substring(11,15)+"-01-"+today.substring(8,10);
			break;
		case "Feb":
			var todayowt=today.substring(11,15)+"-02-"+today.substring(8,10);
			break;
		case "Mar":
			var todayowt=today.substring(11,15)+"-03-"+today.substring(8,10);
			break;
		case "Apr":
			var todayowt=today.substring(11,15)+"-04-"+today.substring(8,10);
			break;
		case "May":
			var todayowt=today.substring(11,15)+"-05-"+today.substring(8,10);
			break;
		case "Jun":
			var todayowt=today.substring(11,15)+"-06-"+today.substring(8,10);
			break;
		case "Jul":
			var todayowt=today.substring(11,15)+"-07-"+today.substring(8,10);
			break;
		case "Aug":
			var todayowt=today.substring(11,15)+"-08-"+today.substring(8,10);
			break;
		case "Sep":
			var todayowt=today.substring(11,15)+"-09-"+today.substring(8,10);
			break;
		case "Oct":
			var todayowt=today.substring(11,15)+"-10-"+today.substring(8,10);
			break;
		case "Nov":
			var todayowt=today.substring(11,15)+"-11-"+today.substring(8,10);
			break;
		default:
			var todayowt=today.substring(11,15)+"-12-"+today.substring(8,10);
			
	}
	*/
	document.getElementById("myDate").defaultValue = "2014-02-09";
}