var initial;
var total;
var timer;
var pause;

var cd;

var submitButton;
var hour;
var minute;
var cancelButton;
var oBox;
var pDocument;

function initViews() {
    let views = chrome.extension.getViews({
        type: 'popup'
    });
    pDocument = views[0].document;
    cd = pDocument.getElementById("countdown");
    submitButton = pDocument.getElementById("submitButton");
	console.log(views[0],pDocument);
    hour = pDocument.getElementById("hour");
    minute = pDocument.getElementById("minute");
    cancelButton = pDocument.getElementById("cancelButton");
    oBox = pDocument.getElementById('switch_1');
    submitButton.onclick = function () { // when click submit button
        pause = false;
        clearInterval(timer);
        initial = parseInt(pDocument.getElementById("hour").value * 60) + parseInt(pDocument.getElementById("minute").value);
        total = initial * 60;
        timer = setInterval(updateCountdown, 1000);
        chrome.storage.local.set({
            'status': 'block'
        });
        updateIconAndText();
    };

    cancelButton.onclick = function () { // when click cancel button
        if (pause == true) {
            timer = setInterval(updateCountdown, 1000);
            pause = false;
            chrome.storage.local.set({
                'status': 'block'
            });
        } else {
            clearInterval(timer);
            pause = true;
            chrome.storage.local.set({
                'status': 'none'
            });
        }

        updateIconAndText();
    }

    oBox.onclick = function () { // click check box
        if (this.checked) {
            chrome.storage.local.set({
                'status': 'block'
            });
            chrome.contentSettings['notifications'].set({
                'primaryPattern': '<all_urls>',
                'setting': 'block'
            });
        } else {
            chrome.storage.local.set({
                'status': 'none'
            });
            chrome.contentSettings['notifications'].clear({});
        }
        updateIconAndText();
    }

    updateIconAndText();
}

function updateCountdown() {
    const minutes = Math.floor(total / 60);
    let seconds = total % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    cd.innerHTML = `${minutes}: ${seconds}`;
    total--;
    if (total < 0) {
        clearInterval(timer);
        chrome.storage.local.set({
            'status': 'none'
        });
        updateIconAndText();
    }
}

function updateIconAndText() { // when status change, update icon and text
    var boxText = pDocument.getElementById("boxText");
    chrome.storage.local.get("status", function (item) {
        if (item.status == 'block') {
            boxText.innerText = "Focus Mode On";
            oBox.checked = true;
            chrome.browserAction.setIcon({
                "path": {
                    '19': '../images/icon_white_19.png',
                    '38': '../images/icon_white_38.png'
                }
            });
        } else {
            boxText.innerText = "Focus Mode Off";
            oBox.checked = false;
            chrome.browserAction.setIcon({
                "path": {
                    '19': '../images/icon_black_19.png',
                    '38': '../images/icon_black_38.png'
                }
            });
        }
    });
}