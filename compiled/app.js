var app = angular.module('app',[]);
app.controller('test123',function($scope){

$scope.name='test123';


$scope.callout = function() {
 alert('Calling out from the ' + $scope.name + ' controller.');
}


//Init:


$scope.callout();

});


app.directive('testooo',function(){

return {
restrict: 'E',template: '<div style="border: 1px solid black">testooo</div>'};})

