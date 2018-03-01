angular
  .module('QRreader')
  .controller('UserController', UserController);

UserController.$inject = ['$window', 'Resource', '$scope', 'Utils'];

function UserController($window, Resource, $scope, Utils) {
  const uc = this;
  uc.isLogged = localStorage.getItem('isLogged') == null ? false : localStorage.getItem('isLogged');
  if (uc.isLogged == true || uc.isLogged == 'true') {
    //variables
    uc.resources = [];
    //functions
    uc.getInitials = getInitials;
    uc.addUser = addUser;
    //
    function addUser() {
      addUserForm(callback, null);
      function callback(data) {
        if (Utils.isEmptyObj(data)) {
          bootbox.alert('Todos los datos son obligatorios');
        } else {
          Resource.addUser(data, localStorage.getItem('bearer')).then(function (data) {
            if (data.status == 200) {
              closeForm();
              bootbox.alert('Se creó el usuario exitosamente');
            } else {
              bootbox.alert('Ocurrió un error consulte al administrador');
            }
          }).catch(function (error) {
            if (error.status == 500) {
              bootbox.alert('El usuario ya existe');
            } else {
              bootbox.alert('Ocurrió un error consulte al administrador');
            }
          });
        }
      }
    }
    function getInitials(name) {
      return Utils.getInitials(name);
    }
    Resource.getAllUsers(localStorage.getItem('bearer')).then(function (data) {
      if (data.status == 200) {
        uc.resources = data.data;
      } else {
        uc.resources = [];
      }
    });
  } else {
    $window.location.href = '#!/login';
  }
}