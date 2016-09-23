var app = angular.module('sphoto', ['ui.router']);


app.config(function ($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

});

