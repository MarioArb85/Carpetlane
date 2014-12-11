// New angularJS app
var myAppModule = angular.module('myApp', ['ngRoute']);

// Routing
myAppModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
      }).
      when('/new_order', {
        templateUrl: 'views/new_order.html',
        controller: 'newOrderController'
      }).
      when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'ordersController'
      }).                  
      when('/orders/modidy_order/:order', {
        templateUrl: 'views/modify_order.html',
        controller: 'modifyOrderController'
      }).
      when('/close_order', {
        templateUrl: 'views/close_order.html',
        controller: 'closeOrderController'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
