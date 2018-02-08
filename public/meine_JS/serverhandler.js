let reload
function setReloadId(id){
  reload = id
}

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
      Materialize.toast(userText,10000)
      onSaved()
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(JSON.stringify(json))
}

function teacherSearch(){
  let teacherEl = document.getElementById('search')

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
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}

let undo = {}

function deleteEintrag(id){
  let httpReq = new XMLHttpRequest()
  httpReq.open("DELETE", '/api/delete/'+id)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert(errData['userdesc'])
    }else{
      undo[id] = JSON.parse(this.responseText)[0]
      let toastContent = '<span>Eintrag gelöscht</span> <button onClick="undoDelete('+id+')" class="btn-flat toast-action">Undo</button>'
      Materialize.toast(toastContent, 10000)
      teacherSearch()
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(null)
}

function undoDelete(id){
  console.log('UNDO: '+id)
  console.log(undo[id])

  if(!undo[id]){
    console.log('NOPE');
    return
  }

  Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
  }

  let json = {}
  json['Datum'] = undo[id].date
  json['BeginnE'] = undo[id].lesson
  json['AnzahlKoffer'] = 1
  json['LehrerKzl'] = undo[id].teachername
  json['Klasse'] = undo[id].class

  undo[id] = false

  let httpReq = new XMLHttpRequest()
  httpReq.open("POST", "/api/save")
  httpReq.setRequestHeader('Content-Type', 'application/json')
  httpReq.onload = function() {
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
      Materialize.toast(userText,10000)
      teacherSearch()
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(JSON.stringify(json))
}
