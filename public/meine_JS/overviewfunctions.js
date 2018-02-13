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
  let generator = ''
  generator += '<h1 class="'+getColor()+'-text center-align">Übersicht über heute</h1>'
  generator += '<ul class="collapsible popout" data-collapsible="accordion">'
  for (let i = 0; i < 10; i++) {
    generator += '<li>'
    generator += '<div class="collapsible-header"><i class="material-icons">access_time</i>'+ lessonNames[i] +' Stunde</div>'
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
