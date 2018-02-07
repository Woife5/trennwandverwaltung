let active = true
function formsubmit(formEl){
  if(!checkform()){
    return
  }else if(!active){
    return
  }
  active = false

  setTimeout(function(){
    active = true
  }, 2000)

  let dateEl = formEl.elements['Datum']
  let beginEl = formEl.elements['BeginnE']
  let casesEl = formEl.elements['AnzahlKoffer']
  let teacherEl = formEl.elements['LehrerKzl']
  let classEl = formEl.elements['Klasse']

  if(parseInt(casesEl.value) < 1){
    alert('Bitte eine Anzahl an Trennwandboxen größer 0 eingeben!')
    return
  }
  if((parseInt(beginEl.value) < 1) || (parseInt(beginEl.value) > 10)){
    alert('Bitte eine gültige Schulstunde bei "Einheit" angeben. (1 bis 10)')
    return
  }
  if(teacherEl.value.length > 25){
    alert('Lehrername kann nicht länger als 25 Zeichen sein.')
    return
  }
  if(classEl.value.length > 10){
    alert('Klassenname kann nicht länger als 10 Zeichen sein.')
    return
  }

  let json = {}
  json[dateEl.name] = dateEl.value
  json[beginEl.name] = parseInt(beginEl.value)
  json[casesEl.name] = parseInt(casesEl.value)
  json[teacherEl.name] = teacherEl.value
  json[classEl.name] = classEl.value.toUpperCase()

  let httpReq = new XMLHttpRequest()
  httpReq.open("POST", "/api/save")
  httpReq.setRequestHeader('Content-Type', 'application/json')
  httpReq.onload = function() {
    console.log('hurra, respons from server received')
    console.log(this.responseText)

    if (this.status!=200) {
      console.log('Error status: '+this.status)
      let errData = JSON.parse(this.responseText)
      console.log(errData)
      let errText = ''+errData['userdesc']
      //------------------------------------------------------------------------Alert
      alert(errText) //Alert, damit sichergestellt ist, dass der Benutzer mitbekommt, dass es schief gegangen ist.
      //------------------------------------------------------------------------End of Alert
    } else {
      let resData = JSON.parse(this.responseText)
      console.log(resData)
      let userText
      if(resData['data'].length > 1){
        userText = 'Die Trennwände '+resData['data'] + ' wurden Ihnen zugewiesen.'
      }else {
        userText = 'Die Trennwand '+resData['data'] + ' wurde Ihnen zugewiesen.'
      }
      Materialize.toast(userText,10000,'rounded')
      onSaved()
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(JSON.stringify(json))
}

function teacherSearch(formEl){
  let teacherEl = formEl.elements['search']

  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/teacher/'+teacherEl.value)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert(errData['userdesc'])
    }else{
      let data = JSON.parse(this.responseText)
      if(data != []){
        searchresult(data)
      }
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}

function getCases(callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", "/api/cases")
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert(errData['userdesc'])
    }else{
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}

function getReserved(year, month, day, lesson, callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/'+year+'/'+month+'/'+day+'/'+lesson)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert(errData['userdesc'])
    }else{
      console.log(JSON.parse(this.responseText))
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}

function deleteEintrag(i, j){
  let classes = getClasses()
  let klassen = getKey()

  let teacher = classes[Object.keys(klassen)[i]][j].teachername
  let year = classes[Object.keys(klassen)[i]][j].date.getFullYear()
  let month = classes[Object.keys(klassen)[i]][j].date.getMonth()+1
  let day = classes[Object.keys(klassen)[i]][j].date.getDate()
  let lesson = classes[Object.keys(klassen)[i]][j].lesson

  console.log(teacher+', '+year+', '+month+', '+day+', '+lesson)

  let httpReq = new XMLHttpRequest()
  httpReq.open("DELETE", '/api/delete/'+teacher+'/'+year+'/'+month+'/'+day+'/'+lesson)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert(errData['userdesc'])
    }else{
      //Success
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}
