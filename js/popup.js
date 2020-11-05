function startTimer(duration, display) { //statr timer count down
    var timer = duration, hours, minutes, seconds;
    var countDown = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer/60) % 60, 10);
        seconds = parseInt(timer % 60,10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = hours + ":" + minutes+ ":" +seconds;

        if (--timer < 0) {
            clearInterval(countDown);
            chrome.storage.local.set({'status':'none'});
        }
    }, 1000);
    updateIconAndText();
}

var submitButton = document.getElementById("submitButton");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var cancelButton = document.getElementById("cancelButton");
var oBox = document.getElementById('switch_1');
submitButton.onclick = function () { // when click submit button
    var inputSeconds = 60*((60 * hour.value)+minute.value);
    display = document.querySelector('#time');
    chrome.storage.local.set({'status':'block'});
    startTimer(inputSeconds, display);
    updateIconAndText();
};

cancelButton.onclick = function() { // when click cancel button
    chrome.storage.local.set({'status':'none'});
    var inputSeconds = 0;
    display = document.querySelector('#time');
    startTimer(inputSeconds, display);
    updateIconAndText();
}

function updateIconAndText(){ // when status change, update icon and text
  var boxText = document.getElementById("boxText");
  chrome.storage.local.get("status", function(item){
    if(item.status == 'block'){
      boxText.innerText = "Focus Mode On";
      oBox.checked = true;
      chrome.browserAction.setIcon({
        "path":{
          '19': '../images/icon_white_19.png',
          '38': '../images/icon_white_38.png'
        }
      });
    }
    else {
      boxText.innerText = "Focus Mode Off";
      oBox.checked = false;
      chrome.browserAction.setIcon({"path":{
        '19': '../images/icon_black_19.png',
        '38': '../images/icon_black_38.png'
      }});
    }
  });
}


oBox.onclick = function(){ // click check box
  if (this.checked){
    chrome.storage.local.set({'status':'block'});
    chrome.contentSettings['notifications'].set({
      'primaryPattern': '<all_urls>',
      'setting': 'block'
    });
  }
  else {
    chrome.storage.local.set({'status':'none'});
    chrome.contentSettings['notifications'].clear({});
  }
  updateIconAndText();
}

updateIconAndText();
