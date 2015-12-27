var app = angular.module('app',[]);
app.controller('mo',function($scope){

alert('ctrlName is working.');


var name='ctrlName';


function setName(newName) {

name = newName;
}


function getName() {

return name;
}});


