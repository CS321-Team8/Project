var oBox = document.getElementById('switch_1');
function updateIconAndText(){
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


oBox.onclick = function(){
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
