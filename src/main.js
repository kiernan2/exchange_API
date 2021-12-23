import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './css/styles.css';
import APIService from './api-service.js';

function calculateMonies(currency,response) {
  if (response["conversion_rates"][currency]) {
    const currencyValue = response["conversion_rates"][currency];
    let monies = $('#USD').val();
    const result = (currencyValue) * (monies);
    $('.result').text(`That amount of US dollars equals ${result} in ${currency}`);
  } else {
    $('.result').text(`${currency} Not found`);
  }
}

function printResponse(response,currency) {
  calculateMonies(currency,response);
}

async function makeApiCall(currency) {
  const response = await APIService.getMonies();
  if (response.conversion_rates) {
    printResponse(response,currency);
  } else {
    $('.result').text(`Error ${response}`);
  }
}

$(document).ready(function() {
  $('#request').click(function() {
    const currency = $('#currency').val();
    makeApiCall(currency);
  });
});
