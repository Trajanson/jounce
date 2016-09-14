'use strict'

// SETTINGS ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const TIME_NOT_SHOWN                     = 2500;
const TIME_TO_FADE_IN                    = 1250;

const VERTICAL_DIVIDER_HEIGHT_AS_PERCENT_OF_FORM_HEIGHT = 0.9;

const BACKGROUND_BLUR_VALUE = "3px";
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




document.addEventListener("DOMContentLoaded", function(event) {
  $('#Checkout').hide();
  window.setTimeout(function() {
      $('#Checkout').fadeIn(TIME_TO_FADE_IN);

      $(window).resize(resizeVerticalDividerHeight)

      resizeVerticalDividerHeight();

      $("#background").css({
        "-webkit-filter": `blur(${BACKGROUND_BLUR_VALUE})`,
        "-moz-filter": `blur(${BACKGROUND_BLUR_VALUE})`,
        "-o-filter": `blur(${BACKGROUND_BLUR_VALUE})`,
        "-ms-filter": `blur(${BACKGROUND_BLUR_VALUE})`,
        "filter": `blur(${BACKGROUND_BLUR_VALUE})`,
      });

  }
  , TIME_NOT_SHOWN)
});




function resizeVerticalDividerHeight () {
  let formHeight = $('form').height();
  console.log(formHeight);
  $('#vertical-divider').css("height",
    formHeight * VERTICAL_DIVIDER_HEIGHT_AS_PERCENT_OF_FORM_HEIGHT
  );
}
