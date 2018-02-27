'use strict';

angular
    .module('QRreader')
    .factory('Utils', Utils);

Utils.$inject = ['$window'];

function Utils($window) {
    let isTokenExpired = false;
    return {
        orderBy: orderBy,
        validateEmail: validateEmail,
        validateFieldEmpty: validateFieldEmpty,
        compareObjects: compareObjects,
        tokenExpired: tokenExpired,
        getTokenExpired: getTokenExpired,
    };
    function getTokenExpired() {
        return isTokenExpired;
    }
    function tokenExpired(status) {
        isTokenExpired = status;
    }

    function compareObjects(objectOne, objectTwo) {
        return angular.toJson(objectOne) === angular.toJson(objectTwo);
    }

    function orderBy(property, reverse) {
        reverse = (property === property) ? !reverse : false;
        return reverse;
    }

    function validateEmail(email) {
        const emailR = /^\w+([\.\-\+]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,4})+$/;
        if (emailR.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    function validateFieldEmpty(field) {
        const fieldR = /([^\s])/;
        if (field == null) {
            return true;
        } else if (fieldR.test(field)) {
            return false;
        } else {
            return true;
        }
    }
}