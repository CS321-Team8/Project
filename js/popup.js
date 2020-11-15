var initial;
var total;
var timer;
var pause;

const cd = document.getElementById("countdown");

function updateCountdown() {
	const minutes = Math.floor(total / 60);
	let seconds = total % 60;
	seconds = seconds < 10 ? '0'+ seconds  : seconds;
	cd.innerHTML = `${minutes}: ${seconds}`;
	total--;
  if (total < 0) {
    clearInterval(timer);
    chrome.storage.local.set({'status':'none'});
    updateIconAndText();
  }
}

var submitButton = document.getElementById("submitButton");
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var cancelButton = document.getElementById("cancelButton");
var oBox = document.getElementById('switch_1');

submitButton.onclick = function () { // when click submit button
	pause = false;
	clearInterval(timer);
	initial = parseInt(document.getElementById("hour").value * 60) + parseInt(document.getElementById("minute").value);
	total = initial * 60;
	timer = setInterval(updateCountdown, 1000);
    chrome.storage.local.set({'status':'block'});
	updateIconAndText();
};

cancelButton.onclick = function() { // when click cancel button
    if (pause == true) {
		timer = setInterval(updateCountdown, 1000);
		pause = false;
    chrome.storage.local.set({'status':'block'});
	}
	else {
		clearInterval(timer);
		pause = true;
    chrome.storage.local.set({'status':'none'});
	}

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
