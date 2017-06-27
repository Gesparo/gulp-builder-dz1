var test = (function () {
  var mainContent = $('.main-content'),
      leftSection = mainContent.find('.main-content__left-section'),
      rightSection = mainContent.find('.main-content__right-section'),
      testBlock = mainContent.find('.main-content__test-block'),
      questions = mainContent.find('.main-content__question'),
      confirmTest = mainContent.find('.main-content__confirm-test'),
      testLeftSection = mainContent.find('.main-content__test-left-section'),
      discount = 0,
      discountElement = $('#discount');

  var init = function () {
    $('.main-content__test-button').on('click', activateTestEvent);

    $('.main-content_next-button').on('click', nextStepEvent);
  };

  /**
   * Show next question
   *
   * @param e
   * @returns {boolean}
   */
  var nextStepEvent = function (e) {
    e.preventDefault();

    var $this = $(this),
        nextQuestionNumber = $this.data('next'),
        questionBlock = $this.closest('.main-content__question');

    questionBlock.hide();

    _changeDiscountAmount( _increaseDiscountAmount() );

    if( isNumber(nextQuestionNumber) )
    {
      var nextQuestion = null;

      nextQuestion = questions.filter(function () {
        return $(this).data('question') == nextQuestionNumber;
      }).eq(0);

      nextQuestion.show();
      fucusBlock(nextQuestion);

      return true;
    }

    testLeftSection.hide();
    showFlex(confirmTest);
    $('#total-discount').text(discount);

    return true;
  };

  /**
   * Set fucus on element
   *
   * @param element
   */
  var fucusBlock = function (element) {
    $('html, body').animate({
      scrollTop: element.eq(0).offset().top
    }, 500);
  };

  /**
   * Activate test
   *
   * @param e
   */
  var activateTestEvent = function (e) {
    e.preventDefault();

    leftSection.hide();
    rightSection.hide();
    showFlex(testBlock);

    var questionNumber = $(this).data('next');
    var firstQuestion = null;

    firstQuestion = questions.filter(function () {
      return $(this).data('question') == questionNumber;
    }).eq(0);

    firstQuestion.show();
    fucusBlock(firstQuestion);
  };

  var _increaseDiscountAmount = function () {
    return discount += 5000;
  };

  var _changeDiscountAmount = function (amount) {
    return discountElement.fadeOut(50, function () {
      discountElement.text(amount).fadeIn(500)
    });
  };

  /**
   * Display element as flex
   *
   * @param element
   * @returns {boolean}
   */
  var showFlex = function (element) {
    element.show().css('display', 'flex');

    return true;
  };

  /**
   * Check if it's number
   *
   * @param n
   * @returns {boolean}
   */
  var isNumber = function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  return {
    init : init
  };
})();