      chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: ["*://www.twitter.com/*","*://www.facebook.com/*", "*://www.youtube.com/*"]},
        ["blocking"]);
