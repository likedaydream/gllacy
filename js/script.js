'use strict';

var modalFeedbackLink = document.querySelector('.contacts-form-link');
var modalFeedback = document.querySelector('.modal-feedback');
var modalOverlay = document.querySelector('.modal-overlay');

if (modalFeedback) {
  var modalClose = modalFeedback.querySelector('.modal-close');

  // Show feedback form
  modalFeedbackLink.addEventListener('click', function (evt) {
    evt.preventDefault();

    var firstInput = modalFeedback.querySelector('[name]');

    modalFeedback.classList.add('modal-show');
    modalOverlay.classList.add('modal-show');

    if (firstInput) {
      firstInput.focus();
    }
  });

  // Close feedback form
  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();

    modalFeedback.classList.remove('modal-show');
    modalOverlay.classList.remove('modal-show');
  });
}

// Slider
var slider = document.querySelector('.slider');
if (slider) {
  var sliderDots = slider.querySelectorAll('.slider-dots .dot-btn');
  var sliderSlides = slider.querySelectorAll('.slide');
  var sliderActiveDot;

  var sliderActiveIndex = function () {
    var defaultIndex = false;
    var activeIndex;

    sliderActiveDot = slider.querySelector('.dot-btn-active');
    if (!sliderActiveDot) { return defaultIndex; }
    activeIndex = sliderActiveDot.getAttribute('data-index');
    if (!activeIndex) { return defaultIndex; }
    return activeIndex;
  };

  var sliderShowSlide = function(index) {
    if (!sliderSlides[index]) { return; }

    // change slide
    var activeSlide = slider.querySelector('.slide-show');
    if (activeSlide) {
      activeSlide.classList.remove('slide-show');
    }
    sliderSlides[index].classList.add('slide-show');

    // change dot btn
    var activeIndex = sliderActiveIndex();
    var newActiveDot;
    if (activeIndex !== false) {
      if (sliderActiveDot) {
        sliderActiveDot.classList.remove('dot-btn-active');
      }
      newActiveDot = slider.querySelector('.dot-btn[data-index="' + index + '"]');
      if (newActiveDot) {
        newActiveDot.classList.add('dot-btn-active');
      }

      // change body class for backlight
      var body = document.body;
      body.classList.remove('backlight-' + (parseInt(activeIndex, 10) + 1));
      body.classList.add('backlight-' + (parseInt(index, 10) + 1));
    }
  };

  for (var i = 0; i < sliderDots.length; i++) {
    (function (i) {
      sliderDots[i].setAttribute('data-index', i);

      sliderDots[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        sliderShowSlide(i);
      });

    } (i));
  }
}


// Prevent input autocomplete breaking hover state
var dropDownContainers = document.querySelectorAll('.dropdown-container');

for (var i = 0; i < dropDownContainers.length; i++) {
  dropDownContainers[i].addEventListener('focus', function (evt) {
    this.classList.add('dropdown-show');
  }, {capture: true});

  dropDownContainers[i].addEventListener('blur', function (evt) {
    if ( !(
      evt.relatedTarget
      && this.contains(evt.relatedTarget)
    )) {
      this.classList.remove('dropdown-show');
    }
  }, {capture: true});
}

// Enable tabbing to dropdown content
var dropdownBtns = document.querySelectorAll('.dropdown-btn');

for (var i = 0; i < dropdownBtns.length; i++) {
  dropdownBtns[i].addEventListener('focus', function (evt) {
    if (this.nextElementSibling
      && this.nextElementSibling.classList.contains('dropdown-container')
    ) {
      this.nextElementSibling.classList.add('dropdown-show');
    }
  });
  dropdownBtns[i].addEventListener('blur', function (evt) {
    if ( !(
      this.nextElementSibling
      && this.nextElementSibling.classList.contains('dropdown-container')
      && evt.relatedTarget
      && this.nextElementSibling.contains(evt.relatedTarget)
    )) {
      this.nextElementSibling.classList.remove('dropdown-show');
    }
  });
}
