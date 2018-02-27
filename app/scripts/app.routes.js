angular
  .module('QRreader')
  .config(routes);

routes.$inject = ['$routeProvider'];
/**
 * @function routes
 */
function routes($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController as lc',
    })
    .when('/admin', {
      templateUrl: 'views/user.html',
      controller: 'UserController as uc',
    })
    .otherwise({
      redirectTo: '/admin',
    });
}
