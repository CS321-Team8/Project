(function(){
  var storage = chrome.storage;

  function updateIconAndText() {
    storage.local.get("notificationStatus", function(item){
      if(item.notificationStatus === "block"){
        boxText.innerText = "Focus Mode On";
        chrome.browserAction.setIcon({'path':'../images/icon_white.png'});
      }
      else {
        boxText.innerText = "Focus Mode Off";
        chrome.browserAction.setIcon({'path':'../images/icon_black.png'});
      }
    });
  }

  function onCheckboxClick(){
    var cBox = document.getElementById('switch_1');
    if (cBox.checked){
      storage.local.set({"notificationStatus": "block"});
      chrome.contentSettings['notifications'].set({
        'primaryPattern':'<all_urls>',
        'setting':'block'
      });
    }
    else{
      storage.local.set({"notificationStatus":"none"});
      chrome.contentSettings['notifications'].clear({});
    }
    updateIconAndText();
  }


  updateIconAndText();


  var cBox = document.getElementById('switch_1');
  cBox.addEventListener("click",onCheckboxClick);
})();
