'use strict';

/**
 * @ngdoc function
 * @name QRreader.controller:MainCtrl
 * @description
 * # MainCtrl
 */
angular
  .module('QRreader')
  .controller('LoginController', LoginController);

LoginController.$inject = ['Resource', 'Utils', '$window'];

/**
 * @function LoginController
 */
function LoginController(Resource, Utils, $window) {
  const lc = this;
  console.log(lc);
  //variables
  lc.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');
  lc.userId = localStorage.getItem('userId');
  //lc.status = localStorage.getItem('status');
  lc.loginData = {
    username: '',
    password: '',
  };

  //functions
  lc.login = login;
  function animateInput(inputs) {
    let status = false;
    inputs.forEach((val) => {
      if (!val.status) {
        status = true;
        val.input.addClass('alert-input alert-effect');
      } else {
        val.input.removeClass('alert-input');
      }
    }, this);
    return status;
  }

  function login() {
    let username = $("#username"),
      password = $("#password"),
      error = false;

    const inputs = [
      { input: password, status: !Utils.validateFieldEmpty(lc.loginData.password), },
      { input: username, status: (!Utils.validateFieldEmpty(lc.loginData.username) && !Utils.validateEmail(lc.loginData.username)) }
    ];
    error = animateInput(inputs);
    if (error) {
      lc.error = 'Por favor llene los campos correctamente.';
      setTimeout(function () {
        username.removeClass('alert-effect');
        password.removeClass('alert-effect');
      }, 500);
      return false;
    } else {
      sendLogin(lc.loginData);
    }
  }

  function sendLogin(loginData) {
    Resource.login(loginData).then((data) => {
      if (data.data && data.data.name && data.status == 200) {
        localStorage.setItem('bearer', `Bearer ${data.data.token}`);
        localStorage.setItem('isLogged', true);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('userId', data.data.userId);
        lc.isLogged = true;
        //default values
        lc.loginData.password = '';
        lc.error = ''
        $window.location.href = '#!/admin';
      } else {
        switch (data.status) {
          case 401:
            lc.error = 'Usuario y/o contraseña erroneos.'
            break;
        }
      }
    }).catch(function (data) {
      lc.error = 'Ocurrió un error en la petición. Consulta al administrador del sitio';
    });
  }
}
