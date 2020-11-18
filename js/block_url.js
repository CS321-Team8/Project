chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return {cancel: true}; },
    {urls: ["https://twitter.com"]},
    ["blocking"]);
