function getdate() {
  var date = new Date();

  date = new Date();
  var today = new Date(date);
  if (today.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (today.toString().substring(0, 3) == "Son") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  today = new Date(date);
  today = today.toString();
  today = today.substring(0, 15);
  document.getElementById("today").innerHTML = today;

  date = new Date();
  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  if (tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (tomorrow.toString().substring(0, 3) == "Son") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  tomorrow = tomorrow.toString();
  tomorrow = tomorrow.substring(0, 15);
  document.getElementById("tomorrow").innerHTML = tomorrow;

  date = new Date();
  var Ütomorrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  if (Ütomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (Ütomorrow.toString().substring(0, 3) == "Son") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  Ütomorrow = new Date(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  Ütomorrow = Ütomorrow.toString();
  Ütomorrow = Ütomorrow.substring(0, 15);
  document.getElementById("Ütomorrow").innerHTML = Ütomorrow;

  date = new Date();
  var Ü2tomorrow = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  if (Ü2tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (Ü2tomorrow.toString().substring(0, 3) == "Son") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  Ü2tomorrow = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
  Ü2tomorrow = Ü2tomorrow.toString();
  Ü2tomorrow = Ü2tomorrow.substring(0, 15);
  document.getElementById("Ü2tomorrow").innerHTML = Ü2tomorrow;

  date = new Date();
  var Ü3tomorrow = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
  if (Ü3tomorrow.toString().substring(0, 3) == "Sat") {
    date = new Date(date.getTime() + 2 * 24 * 3600 * 1000);
  }
  if (Ü3tomorrow.toString().substring(0, 3) == "Son") {
    date = new Date(date.getTime() + 24 * 3600 * 1000);
  }
  Ü3tomorrow = new Date(date.getTime() + 4 * 24 * 60 * 60 * 1000);
  Ü3tomorrow = Ü3tomorrow.toString();
  Ü3tomorrow = Ü3tomorrow.substring(0, 15);
  document.getElementById("Ü3tomorrow").innerHTML = Ü3tomorrow;

}
