function formsubmit(formEl){
  let dateEl = formEl.elements['Datum']
  let beginEl = formEl.elements['BeginnE']
  let casesEl = formEl.elements['AnzahlKoffer']
  let teacherEl = formEl.elements['LehrerKzl']
  let classEl = formEl.elements['Klasse']

  if(parseInt(casesEl.value) < 1){
    alert('Bitte eine Anzahl größer 0 eingeben!')
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
  let datum = new Date(dateEl.value)
  let nulldate = new Date("wrgwr")
  if(datum.getTime() === nulldate.getTime()){
    alert('Kein gültiges Datum! Format: yyyy-mm-dd')
    return
  }

  let json = {}
  json[dateEl.name] = dateEl.value
  json[beginEl.name] = parseInt(beginEl.value)
  json[casesEl.name] = parseInt(casesEl.value)
  json[teacherEl.name] = teacherEl.value
  json[classEl.name] = classEl.value

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
      let errText = errData['userdesc']
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
      let options = {
        body: userText,
        icon: '/Images/HTL-Logo.png'
      };
      //------------------------------------------------------------------------Notification
        if (!("Notification" in window)) {
          alert(userText);
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification('Gespeichert',options);
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
          Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              var notification = new Notification('Gespeichert',options);
            }
          })
        }
        //----------------------------------------------------------------------End of Notification
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
  httpReq.send(JSON.stringify(json))
}

function deleteSearch(formEl){
  let teacherEl = formEl.elements['search']

  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/teacher/'+teacherEl.value)
  httpReq.send(null)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert('Error: '+errData['userdesc'] + ' Errormessage: '+errData['errordata'])
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
}

function getCases(callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", "/api/cases")
  httpReq.send(null)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert('Error: '+errData['userdesc'] + ' Errormessage: '+errData['errordata'])
    }else{
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
}

function getReserved(year, month, day, lesson, callback){
  let httpReq = new XMLHttpRequest()
  httpReq.open("GET", '/api/'+year+'/'+month+'/'+day+'/'+lesson)
  httpReq.send(null)
  httpReq.onload = function() {
    if(this.status != 200){
      let errData = JSON.parse(this.responseText)
      alert('Error: '+errData['userdesc'] + ' Errormessage: '+errData['errordata'])
    }else{
      console.log(JSON.parse(this.responseText))
      callback(JSON.parse(this.responseText))
    }
  }
  httpReq.onerror = function() {
    alert('Unknown network error occured')
  }
}

function deleteEintrag(i,j){
  console.log("im DeleteEintrag  "+i+j);
// viel spaß Woife

}
