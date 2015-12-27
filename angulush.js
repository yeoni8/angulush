var chalk = require('chalk');
var fs = require('fs');

var command = process.argv[2];



if (!command){
    console.log('usage ' + chalk.green('node angulush *command*'));
}
switch (command) {

    case 'create:module':
    break;

    case 'controller':


        //name of the controller
        var ctrlName = process.argv[3];
        if (!ctrlName){
            console.log(calk.red('Missing parameter - name of controller'));
            process.exit(1);
        }
        /////////////////////////


        //writing a new controller file
        var content =   'alert(\'ctrlName is working.\');\n\n\nvar name=\'ctrlName\';\n\n\n' +
                        'function setName(newName) {\n\nname = newName;\n}\n\n\n' +
                        'function getName() {\n\nreturn name;\n}';

        saveFile(ctrlName + '.js',content,'controllers');
        /////////////////////////
    break;

    case 'create:directive':
    break;


    case 'build':



        var appName = process.argv[3];
        if (!appName){
            console.log(chalk.red('Missing parameter - name of module'));
            process.exit(1);
        }

        var controllers = fs.readdirSync('controllers/');
        var modules = [];
        var file = 'var app = angular.module(\'' + appName + '\',[' + modules.join() + ']);\n';
        


        for (var i=0; i<controllers.length;i++){



            file += 'app.controller(\'' + controllers[i].slice(0,-3) + '\',function($scope){\n\n';

            file += fs.readFileSync('controllers/' + controllers[i]);



            file += '});\n\n\n';
        }


        saveFile(appName + '.js',file,'compiled');



        var htmlFile = '<html><head><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script><script src="' + appName + '.js"></script></head><body ng-app="' + appName + '">';

        for (var i=0; i<controllers.length;i++){
            controllers[i] = controllers[i].slice(0,-3);
            htmlFile += '<div ng-controller="' + controllers[i] + '"></div>';
        }

        htmlFile += '</body></html>';
        saveFile('index.html',htmlFile,'compiled');

    break;
    default:
        console.log(chalk.red('unknown command'));
}



function saveFile(fileName,data,directory) {

        if (directory)
            fileName = directory + '/' + fileName;

        var writer = new fs.createWriteStream(fileName);
        writer.write(new Buffer(data));
        writer.end();
}