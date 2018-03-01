angular
  .module('QRreader')
  .config(routes);

routes.$inject = ['$routeProvider'];
/**
 * @function routes
 */
function routes($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController as vm',
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController as lc',
    })
    .when('/admin', {
      templateUrl: 'views/admin.html',
      controller: 'AdminController as uc',
    })
    .when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UserController as uc',
    })
    .when('/qr/:qrid', {
      templateUrl: 'views/qr.html',
      controller: 'QRController as qc',
    })
    .otherwise({
      redirectTo: '/',
    });
}
