chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log('In webRequest');
        return {cancel: true};
    }, {
        urls: ["https://*.twitter.com/*"]
    }, ["blocking"]
);
