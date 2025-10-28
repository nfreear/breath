const ANALYTICS_ID = 'UA-8330079-9';

export default function /* setupAnalytics */ () {
  if (navigator.onLine) {
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    /* eslint-enable */

    console.debug('Breath App: online (analytics)');
  } else {
    console.debug('Breath App: offline (analytics)');
  }

  const ga = window.ga || (() => {}); // function () {};

  ga('create', ANALYTICS_ID, 'auto');
  ga('send', 'pageview');
}
