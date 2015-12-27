var app = angular.module('app',[]);
app.controller('test123',function($scope){

alert('The controller test123 is working.');


var name='test123';


function setName(newName) {

name = newName;
}


function getName() {

return name;
}});


app.directive('testooo',function(){

return {
restrict: 'E',template: '<div style="border: 1px solid black">testooo</div>'};})


