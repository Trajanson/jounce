'use strict'

//= require jquery
//= require jquery_ujs
//= require card.js

// SETTINGS ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const TIME_NOT_SHOWN                     = 2500;
const TIME_TO_FADE_IN                    = 1250;
const TIME_BETWEEN_SIMULATED_KEY_STROKES = 150;
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




var userNameArray = ["A", "r", "y", "a", " ", "S", "t", "a", "r", "k" ];
var testCreditCards = [
  [4,2,4,2, " ", 4,2,4,2," ", 4,2,4,2," ", 4,2,4,2],
  [5,5,5,5," ", 5,5,5,5," ", 5,5,5,5," ", 4,4,4,4],
  // [3,7,8,2," ", 8,2,2,4," ", 6,3,1,0," ", 0,0,5],

  [6,0,1,1," ", 1,1,1,1," ", 1,1,1,1," ", 1,1,1,7]
];


var randomCreditCardToSimulate = testCreditCards[Math.ceil(Math.random() * (testCreditCards.length - 1))];

var testExpirationDate = "03 / 17".split("");

var testSecurityCode = ["7","", "", "", "3", "3"];

var zipCode = "07030".split("");

var finalName = "No One".split("");



document.addEventListener("DOMContentLoaded", function(event) {


  $('#Checkout').hide();
  window.setTimeout(function() {
    $('#Checkout').fadeIn(TIME_TO_FADE_IN);


    $('form').card({
      container: '.card-wrapper', // *required*

      formSelectors: {
          numberInput: 'input#CreditCardNumber', // optional — default input[name="number"]
          expiryInput: 'input#ExpiryDate', // optional — default input[name="expiry"]
          cvcInput: 'input#SecurityCode', // optional — default input[name="cvc"]
          nameInput: 'input#NameOnCard' // optional - defaults input[name="name"]
      },

      width: 200, // optional — default 350px
      formatting: true, // optional - default true

      // Strings for translation - optional
      messages: {
          validDate: 'valid\ndate', // optional - default 'valid\nthru'
          monthYear: 'mm/yyyy', // optional - default 'month/year'
      },

      // Default placeholders for rendered fields - optional
      placeholders: {
          number: '•••• •••• •••• ••••',
          name: 'Full Name',
          expiry: '••/••',
          cvc: '•••'
      },

      // if true, will log helpful messages for setting up Card
      debug: true // optional - default false

    });




    var tickCounter = 0;
    var numberOfNameLettersToType = userNameArray.length;
    var numberOfCreditCardNumbersToType = randomCreditCardToSimulate.length;
    var numberOfExpirationDateLettersToType = testExpirationDate.length;
    var numberOfSecurityCodeLettersToType = testSecurityCode.length;
    var numberOfZipCodeNumbersToType = zipCode.length;

    var numberOfLettersToDelete = numberOfNameLettersToType;
    var numberOfFinalNameLettersToType = finalName.length;


    var numberOfNameLettersTyped = 0;
    var numberOfCreditCardNumbersTyped = 0;
    var numberOfExpirationDateNumbersTyped = 0;
    var numberOfSecurityCodeNumbersTyped = 0;
    var numberOfZipCodeNumbersTyped    = 0;
    var numberOfNameLettersDeleted = 0;
    var numberOfFinalNameLettersTyped = 0;

    var creditCardTyper = function() {
      var creditCardNameBox        = $('#NameOnCard'),
          previousCreditCardName   = creditCardNameBox.val(),
          newCreditCardNameLetterToAdd = userNameArray[numberOfNameLettersTyped],

          creditCardNumberBox      = $("#CreditCardNumber"),
          previousCardValue        = creditCardNumberBox.val(),
          newCreditCardNumberToAdd = randomCreditCardToSimulate[numberOfCreditCardNumbersTyped],

          expirationDateBox        = $("#ExpiryDate"),
          previousExpirationValue  = expirationDateBox.val(),
          newExpirationValueToAdd  = testExpirationDate[numberOfExpirationDateNumbersTyped],

          secureCodeBox            = $("#SecurityCode"),
          previousSecureCodeValue  = secureCodeBox.val(),
          newSecureCodeValueToAdd  = testSecurityCode[numberOfSecurityCodeNumbersTyped],

          zipCodeBox            = $("#ZIPCode"),
          previousZipCodeValue  = zipCodeBox.val(),
          newZipCodeValueToAdd  = zipCode[numberOfZipCodeNumbersTyped],

          finalCreditCardNameLetterToAdd = finalName[numberOfFinalNameLettersTyped]
          ;


      if (numberOfNameLettersTyped < numberOfNameLettersToType) {
        creditCardNameBox.focus();
        creditCardNameBox.val(previousCreditCardName + String(newCreditCardNameLetterToAdd));
        numberOfNameLettersTyped += 1;
      } else if (numberOfCreditCardNumbersTyped < numberOfCreditCardNumbersToType){
        // MOVE ON TO NEXT PROCESS
        creditCardNumberBox.focus();
        creditCardNumberBox.val(previousCardValue + String(newCreditCardNumberToAdd));
        numberOfCreditCardNumbersTyped += 1;

      } else if (numberOfExpirationDateNumbersTyped < numberOfExpirationDateLettersToType){
        // MOVE ON TO NEXT PROCESS
        expirationDateBox.focus();
        expirationDateBox.val(previousExpirationValue + String(newExpirationValueToAdd));
        numberOfExpirationDateNumbersTyped += 1;

      } else if (numberOfSecurityCodeNumbersTyped < numberOfSecurityCodeLettersToType){
        // MOVE ON TO NEXT PROCESS
        secureCodeBox.focus();
        secureCodeBox.val(previousSecureCodeValue + String(newSecureCodeValueToAdd));
        numberOfSecurityCodeNumbersTyped += 1;

      } else if (numberOfZipCodeNumbersTyped < numberOfZipCodeNumbersToType){
        // MOVE ON TO NEXT PROCESS
        zipCodeBox.focus();
        zipCodeBox.val(previousZipCodeValue + String(newZipCodeValueToAdd));
        numberOfZipCodeNumbersTyped += 1;

      } else if (numberOfNameLettersDeleted < numberOfLettersToDelete){
        // MOVE ON TO NEXT PROCESS
        creditCardNameBox.focus();
        previousCreditCardName = previousCreditCardName.split("");
        previousCreditCardName.pop();
        creditCardNameBox.val(previousCreditCardName.join(""));
        numberOfNameLettersDeleted += 1;

      } else if (numberOfFinalNameLettersTyped < numberOfFinalNameLettersToType){
        // MOVE ON TO NEXT PROCESS
        creditCardNameBox.focus();
        creditCardNameBox.val(previousCreditCardName + String(finalCreditCardNameLetterToAdd));
        numberOfFinalNameLettersTyped += 1;
      } else {
        window.clearInterval(creditCardTyperTimer);
      }


      tickCounter += 1;





      // Trigger the "change" event manually
      var creditCardNameEvent = document.createEvent('HTMLEvents');
      creditCardNameEvent.initEvent('keyup', false, true);
      document.getElementById('NameOnCard').dispatchEvent(creditCardNameEvent);

      // Trigger the "change" event manually
      var creditCardNumberEvent = document.createEvent('HTMLEvents');
      creditCardNumberEvent.initEvent('keyup', false, true);
      document.getElementById('CreditCardNumber').dispatchEvent(creditCardNumberEvent);

      // Trigger the "change" event manually
      var expirationDateEvent = document.createEvent('HTMLEvents');
      expirationDateEvent.initEvent('keyup', false, true);
      document.getElementById('ExpiryDate').dispatchEvent(expirationDateEvent);

      // Trigger the "change" event manually
      var securityCodeEvent = document.createEvent('HTMLEvents');
      securityCodeEvent.initEvent('keyup', false, true);
      document.getElementById('SecurityCode').dispatchEvent(securityCodeEvent);


      // Trigger the "change" event manually
      var zipCodeEvent = document.createEvent('HTMLEvents');
      zipCodeEvent.initEvent('keyup', false, true);
      document.getElementById('ZIPCode').dispatchEvent(zipCodeEvent);







    }.bind(this);

    var creditCardTyperTimer = window.setInterval(creditCardTyper.bind(this), TIME_BETWEEN_SIMULATED_KEY_STROKES);

  }, TIME_NOT_SHOWN);



  $('#PayButton').click(function(event) {
    event.preventDefault();
    parent.location=window.dashboard_url;
  });





});
