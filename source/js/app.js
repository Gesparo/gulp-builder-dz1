(function() {
  'use strict';

  test.init();

  $('.footer_policy').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init();
    moreInfoWindow.load('policy');
  });
})();