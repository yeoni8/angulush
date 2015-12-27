var chalk = require('chalk');
var fs = require('fs');

var command = process.argv[2];



if (!command){
    console.log('usage ' + chalk.green('node angulush *command*'));
}
switch (command) {

    case 'create:module':
    break;

    case 'create:controller':


        //name of the controller
        var ctrlName = process.argv[3];
        if (!ctrlName){
            console.log(calk.red('Missing parameter - name of controller'));
            process.exit(1);
        }
        /////////////////////////


        //writing a new controller file
        var content =   '//This is the init, MUST DECLARE ALL $SCOPE VARIABLES HERE\n\n\nvar name=\'yoni\';\n\n\n' +
                        'function setName(newName) {\n\nname=newName}\n\n\n' +
                        'function getName() {\n\nreturn name;}';
        fs.writeFile('controllers/' + argv[3] + '.js',content);
        /////////////////////////
    break;

    case 'create:directive':
    break;


    case 'build':

        var appName = process.argv[3];
        if (!appName){
            console.log(calk.red('Missing parameter - name of module'));
            process.exit(1);
        }

        var controllers = fs.readDirSync('controllers/');
        var file = 'var app = angular.module(\'' + appName + '\',[' + controllers.implode(',') + ']);\n';


        for (var i=0; i<controllers.length;i++){

            file += 'app.controller(' + controllers[i] + ',function($scope){\n\n';

                file += fs.readFileSync('controllers/' + controller[i]);

            file += '});\n\n\n';
        }


        fs.writeFile(appName + '.js', file);

    break;
}