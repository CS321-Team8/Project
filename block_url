const filter = {
  urls: [
    '*://twitter.com/*',
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
