var app = angular.module('app',[]);
app.controller('test123',function($scope){

$scope.__angulushPrivates9392 = {};

$scope.name='test123';

$scope.__angulushPrivates9392.namo = 'naaaame';



$scope.callout = function() {
 alert('Calling out from the ' + $scope.name + ' controller.');
}

$scope.__angulushPrivates9392.ff = function(){
 alert('the second function');
}

//Init:


$scope.callout();

$scope.__angulushPrivates9392.ff();



});


app.directive('testaaa',function(){

return {
restrict: 'E',template: '<div style="border: 1px solid black; width: 300px; margin: 10px; font-size: 20px;padding: 10px;">A testaaa directive</div>'};})


app.directive('testooo',function(){

return {
restrict: 'E',template: '<div style="border: 1px solid black; width: 300px; margin: 10px; font-size: 20px;padding: 10px;">A testooo directive</div>'};})


