var app = angular.module('app',[mo.js]);
app.controller(mo.js,function($scope){

//This is the init, MUST DECLARE ALL $SCOPE VARIABLES HERE


var name='yoni';


function setName(newName) {

name=newName;
}


function getName() {

return name;
}});


