var test = (function () {
  var mainContent = $('.main-content'),
      leftSection = mainContent.find('.main-content__left-section'),
      rightSection = mainContent.find('.main-content__right-section'),
      testBlock = mainContent.find('.main-content__test-block'),
      questions = mainContent.find('.main-content__question'),
      confirmTest = mainContent.find('.main-content__confirm-test'),
      testLeftSection = mainContent.find('.main-content__test-left-section'),
      discount = 0,
      discountElement = $('#discount'),
      errorElement = mainContent.find('.main-content__test-error-block');

  var init = function () {
    $('.main-content__test-button').on('click', _activateTestEvent);

    $('.main-content_next-button').on('click', _nextStepEvent);
  };

  /**
   * Validate question
   *
   * @param questionElement
   * @returns {boolean}
   * @private
   */
  var _validateQuestion = function (questionElement) {
    var type = questionElement.data('question-type'),
        valid = false;

    switch (type)
    {
      case 'radio':
        valid = _valideRadio(questionElement);
        break;

      case 'input':
        valid = _validInput(questionElement);
        break;

      default:
        break;
    }

    return valid;
  };

  /**
   * Validate input of question block
   *
   * @param questionElement
   * @returns {boolean}
   * @private
   */
  var _validInput = function(questionElement) {
    var inputs = questionElement.find('input').not('input[type="radio"]').not('input[type="checkbox"]').not('input[type="submit"'),
        inputsSize = inputs.length,
        counter = 0;

    if( 0 == inputsSize )
    {
      return false;
    }

    inputs.each(function () {
      if( !_empty( $(this).val() ) )
      {
        ++counter;
      }
    });

    return counter == inputsSize;
  };

  /**
   * Help to check radio buttons on checked property
   *
   * @param questionElement
   * @returns {boolean}
   * @private
   */
  var _valideRadio = function (questionElement) {
    var radioInputs = questionElement.find('input[type="radio"]'),
        valid = false;

    radioInputs.each(function () {
      if( $(this).prop('checked') )
      {
        valid = true;
      }
    });

    return valid;
  };

  /**
   * Show next question
   *
   * @param e
   * @returns {boolean}
   */
  var _nextStepEvent = function (e) {
    e.preventDefault();

    var $this = $(this),
        nextQuestionNumber = $this.data('next'),
        questionBlock = $this.closest('.main-content__question'),
        questionType = questionBlock.data('question-type');

    var validQuestion = _validateQuestion(questionBlock);

    if( !validQuestion )
    {
      switch (questionType)
      {
        case 'radio':
          _showError('Виберите один из вариантов ответа');
          break;

        case 'input':
          _showError('Заполните все поля');
          break;

        default:
          break;
      }

      _fucusBlock(errorElement);

      return false;
    }

    hideError();
    questionBlock.hide();

    _changeDiscountAmount( _increaseDiscountAmount() );

    if( _isNumber(nextQuestionNumber) )
    {
      var nextQuestion = null;

      nextQuestion = questions.filter(function () {
        return $(this).data('question') == nextQuestionNumber;
      }).eq(0);

      nextQuestion.fadeIn(500, function () {
        _fucusBlock(nextQuestion);
      });

      return true;
    }

    testLeftSection.hide();
    _showFlex(confirmTest);
    $('#total-discount').text(discount);

    return true;
  };

  /**
   * Display error message
   *
   * @param message
   * @private
   */
  var _showError = function (message) {
    errorElement.show().text(message);
  };

  var hideError = function () {
    errorElement.text('').hide();
  };

  /**
   * Set fucus on element
   *
   * @param element
   */
  var _fucusBlock = function (element) {
    $('html, body').animate({
      scrollTop: element.eq(0).offset().top
    }, 500);
  };

  /**
   * Activate test
   *
   * @param e
   */
  var _activateTestEvent = function (e) {
    e.preventDefault();

    leftSection.hide();
    rightSection.hide();
    _showFlex(testBlock);

    var questionNumber = $(this).data('next');
    var firstQuestion = null;

    firstQuestion = questions.filter(function () {
      return $(this).data('question') == questionNumber;
    }).eq(0);

    firstQuestion.fadeIn(600, function () {
      _fucusBlock(firstQuestion);
    });
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
  var _showFlex = function (element) {
    element.fadeIn().css('display', 'flex');

    return true;
  };

  /**
   * Check if it's number
   *
   * @param n
   * @returns {boolean}
   */
  var _isNumber = function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  /**
   * Check if value is not empty
   *
   * @param data
   * @returns {boolean}
   */
  var _empty = function (data) {
    if(typeof(data) == 'number' || typeof(data) == 'boolean')
    {
      return false;
    }
    if(typeof(data) == 'undefined' || data === null)
    {
      return true;
    }
    if(typeof(data.length) != 'undefined')
    {
      return data.length == 0;
    }
    var count = 0;
    for(var i in data)
    {
      if(data.hasOwnProperty(i))
      {
        count ++;
      }
    }
    return count == 0;
  };

  return {
    init : init
  };
})();