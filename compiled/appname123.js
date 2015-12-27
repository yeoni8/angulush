var app = angular.module('appname123',[]);
app.controller('test123',function($scope){

alert('The controller test123 is working.');


var name='ctrlName';


function setName(newName) {

name = newName;
}


function getName() {

return name;
}});


