let reload
function setReloadId(id){
  reload = id
}

let errorduration = 5000
let errorcolor = 'red'

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
  let teacherEl = formEl.elements['LehrerKzl']
  let classEl = formEl.elements['Klasse']
  let cases

  let radios = document.getElementsByName('caseselect')
  for (var i = 0; i < radios.length; i++)
  {
   if (radios[i].checked)
   {
    cases = radios[i].value
    break
   }
  }

  if(cases < 1){
    Materialize.toast('Bitte eine Anzahl an Trennwandkoffern größer 0 eingeben!',errorduration,errorcolor)
    return
  }
  if((parseInt(beginEl.value) < 1) || (parseInt(beginEl.value) > 10)){
    Materialize.toast('Bitte eine gültige Schulstunde bei "Einheit" angeben. (1 bis 10)',errorduration,errorcolor)
    return
  }
  if(teacherEl.value.length > 25){
    Materialize.toast('Lehrername kann nicht länger als 25 Zeichen sein.',errorduration,errorcolor)
    return
  }
  if(classEl.value.length > 10){
    Materialize.toast('Klassenname kann nicht länger als 10 Zeichen sein.',errorduration,errorcolor)
    return
  }

  let json = {}
  json[dateEl.name] = dateEl.value
  json[beginEl.name] = parseInt(beginEl.value)
  json['AnzahlKoffer'] = cases
  json[teacherEl.name] = teacherEl.value
  json[classEl.name] = classEl.value.toUpperCase()

  let httpReq = new XMLHttpRequest()
  httpReq.open("POST", "/api/save")
  httpReq.setRequestHeader('Content-Type', 'application/json')
  httpReq.onload = function() {

    if (this.status!=200) {
      console.log('Error status: '+this.status)
      let errData = JSON.parse(this.responseText)
      console.log(errData)
      let errText = ''+errData['userdesc']
      Materialize.toast(errText,errorduration,errorcolor)
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
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send(JSON.stringify(json))
}

function teacherSearch(){
  let teacherEl = document.getElementById('search')

  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/teacher/'+encodeURIComponent(teacherEl.value))
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      Materialize.toast(errData['userdesc'],errorduration,err)
    }else{
      let data = JSON.parse(this.responseText)
      if(data != []){
        searchresult(data)
      }
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send(null)
}

function getCases(callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", "/api/cases")
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      Materialize.toast(errData['userdesc'],errorduration,erorcolor)
    }else{
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send(null)
}

function getReserved(year, month, day, lesson, callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/'+year+'/'+month+'/'+day+'/'+lesson)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      Materialize.toast(errData['userdesc'],errorduration,errorcolor)
    }else{
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
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
      Materialize.toast(errData['userdesc'],errorduration,errorcolor)
    }else{
      undo[id] = JSON.parse(this.responseText)[0]
      let toastContent = '<span>Eintrag gelöscht</span> <button onClick="undoDelete('+id+')" class="btn-flat toast-action yellow-text">Undo</button>'
      Materialize.toast(toastContent, 10000)
      teacherSearch()
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send(null)
}

function undoDelete(id){
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
      Materialize.toast(errText,errorduration,errorcolor)
    } else {
      let resData = JSON.parse(this.responseText)
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
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send(JSON.stringify(json))
}

function classesFromDB(callback){
  let ret = {}
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", "/api/classes")
  httpReq.onload = function() {
    let data = JSON.parse(this.responseText)
    if (this.status!=200) {
      Materialize.toast('Error',errorduration,errorcolor)
    } else {
      for (let i = 0; i < data.length; i++) {
        ret[data[i].name] = null
      }
      callback(ret)
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send()
}

function teacherFromDB(callback){
  let ret = {}
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", "/api/teacher")
  httpReq.onload = function() {
    let data = JSON.parse(this.responseText)
    if (this.status!=200) {
      Materialize.toast('Error',errorduration,errorcolor)
    } else {
      for (let i = 0; i < data.length; i++) {
        ret[data[i].name] = null
      }
      callback(ret)
    }
  }
  httpReq.onerror = function() {
    Materialize.toast('Unknown network error occured',errorduration,errorcolor)
  }
  httpReq.send()
}
