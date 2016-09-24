app.controller('HomeCtrl', function ($scope) {
	$scope.matrix;

	$scope.imageUrls = [
	'/photospheres/bryce.jpg',
	'/photospheres/desert.jpg',
	'/photospheres/snow.jpg',
	'/photospheres/waterfront.jpg'
	];

	$scope.toggleMatrix = () => $scope.matrix = !$scope.matrix;


});
 