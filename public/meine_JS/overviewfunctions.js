function onload(){
  generateOverview()
}

function getColor() {
  return 'orange'
}

function activeTab(){
  return '<li><a href="/calendar">Eintragen</a></li><li><a href="/info">Information</a></li><li class="active"><a href="#">Übersicht</a></li>'
}

function generateOverview(){
  let lessonNames = ['Erste', 'Zweite', 'Dritte', 'Vierte', 'Fünfte','Sechste','Siebte','Achte','Neunte','Zehnte']
  let stundenzeiten =[' 07:50-08:40',' 08:45-09:35',' 09:40-10:30',' 10:45-11:35',' 11:40-12:30',' 12:35-13:25',' 13:25-14:15',' 14:20-15:10',' 15:15-16:05',' 16:05-16:55']
  let generator = ''
  generator += '<h1 class="'+getColor()+'-text center-align">Tagesübersicht</h1>'
  generator += '<ul class="collapsible popout" data-collapsible="accordion">'
  for (let i = 0; i < 10; i++) {
    generator += '<li>'
    generator += '<div class="collapsible-header"><i class="material-icons">access_time</i>'+ lessonNames[i] +' Stunde' +'<h6 class="right-align">'+ stundenzeiten[i]+'</h6>' + '</div>'
    generator += '<div class="collapsible-body" id="'+i+'"></div>'
    generator += '</li>'
    getOverviewContent(i)
  }

  document.getElementById('content').innerHTML = generator
  $('.collapsible').collapsible()
}

function getOverviewContent(lesson){
  let date =  new Date()
  let generator = ''
  generator += '<table>'
  generator += '<thead><tr><th>Trennwand Koffer</th><th>Lehrername</th></tr></thead>'
  generator += '<tbody>'
  getReserved(date.getFullYear(), date.getMonth()+1, date.getDate(), lesson+1, function(response){
    if(response.length == 0){
      generator = '<h1 class="'+getColor()+'-text center-align">Nichts reserviert!</h1>'
      document.getElementById(lesson).innerHTML = generator
      return
    }
    for (let i = 0; i < response.length; i++) {
      generator += '<tr>'
      generator += '<td>'+response[i].name+'</td>'
      generator += '<td>'+response[i].teachername+'</td>'
      generator += '</tr>'
    }
    generator += '</tbody>'
    generator += '</table>'
    document.getElementById(lesson).innerHTML = generator
  })
}
