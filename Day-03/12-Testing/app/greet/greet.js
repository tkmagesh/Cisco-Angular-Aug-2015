'use strict';

angular.module('myApp.greet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/greet', {
    templateUrl: 'greet/greet.html',
    controller: 'greetCtrl'
  });
}])

.service("greetService", function(){
    this.greet = function(name){
        return 'Hi ' + name + ", Have a nice day!";
    }
})

.filter('trimText', function(){
    return function(data, trimLength){
        return data.length <= trimLength ? data : data.substr(0,trimLength) + '...';
    };
})

.controller('greetCtrl', function($scope, greetService) {
    $scope.name = '';
    $scope.greet = function(){
        $scope.greetMsg = greetService.greet($scope.name);
    };
});
