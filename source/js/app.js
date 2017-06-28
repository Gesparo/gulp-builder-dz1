(function() {
  'use strict';

  test.init();

  // show policy
  $('.footer_policy').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init();
    moreInfoWindow.load('policy');
  });

  // show policy
  $('.main-content__callback-policy-link').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init();
    moreInfoWindow.load('policy');
  });
})();