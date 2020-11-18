const defaultFilters = ["*://*.twitter.com/*"]

chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return { cancel: true}},
    { urls: defaultFilters },
    ["blocking"]
)
