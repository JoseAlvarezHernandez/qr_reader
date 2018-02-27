'use strict';

/**
 * @ngdoc overview
 * @name QRreader
 * @description
 * # QRreader
 *
 * Main module of the application.
 */
angular
  .module('QRreader', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ja.qr'
  ]);