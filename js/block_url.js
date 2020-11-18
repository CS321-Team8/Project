const filter = {
  urls: [
    '*://twitter.com/*', '*://facebook.com/*', '*://youtube.com/*'
  ],
}
const webRequestFlags = [
  'blocking',
];
  page => {
    console.log('page blocked - ' + page.url);

    return {
      cancel: true,
    };
  },
  filter,
  webRequestFlags,
);
chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {cancel: true};
    },
    {
        urls: ["*://site.com/test/*"]
    },
    ["blocking"]
);

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  var current = window.location.href;
  if(current.startsWith(text)){
    document.documentElement.innerHTML = '';
    document.documentElement.innerHTML = 'Domain is blocked';
    document.documentElement.scrollTop = 0;
  }
}


findURL("https://www.twitter.com/");
findAllURL("https://www.facebook.com/");
