app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/templates/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('viewer', {
        url: '/viewer',
        params: { url: null, matrix: false },
        templateUrl: '/templates/viewer.html',
        controller: 'ViewerCtrl'
    });
});
