'use strict';

/**
 * @ngdoc function
 * @name QRreader.controller:HeaderController
 * @description
 * # MainCtrl
 */
angular
    .module('QRreader')
    .controller('HeaderController', HeaderController);

HeaderController.$inject = ['Resource', 'Utils', '$scope', '$window', '$compile'];

/**
 * @function HeaderController
 */
function HeaderController(Resource, Utils, $scope, $window, $compile) {
    const hc = this;
    //variables
    hc.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');

    //Scopes
    $scope.$watch(
        () => {
            return localStorage.isLogged;
        },
        (newVal, oldVal) => {
            if (newVal == undefined)
                return;
            hc.isLogged = newVal;
        }
    );
    //functions
    hc.logout = logout;
    hc.login = login;

    function login(){
        $window.location.href = `#!/login`;
    }

    function logout() {
        hc.isLogged = false;
        localStorage.clear();
        $window.location.href = '#!/';
    }
}
