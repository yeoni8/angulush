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
        var content =   'alert(\'The controller ' + ctrlName + ' is working.\');\n\n\nvar name=\'' + ctrlName + '\';\n\n\n' +
                        'function setName(newName) {\n\nname = newName;\n}\n\n\n' +
                        'function getName() {\n\nreturn name;\n}';

        saveFile(ctrlName + '.js',content,'controllers');
        /////////////////////////
    break;

    case 'directive':
        //name of the controller
        var directiveName = process.argv[3];
        if (!directiveName){
            console.log(calk.red('Missing parameter - name of directive'));
            process.exit(1);
        }
        /////////////////////////


        //writing a new controller file
        var content =   '<div style="border: 1px solid black">' + directiveName + '</div>';

        saveFile(directiveName + '.html',content,'directives');
        /////////////////////////
    break;


    case 'build':



        var appName = process.argv[3];
        if (!appName){
            console.log(chalk.red('Missing parameter - name of module'));
            process.exit(1);
        }

        var controllers = fs.readdirSync('controllers/');
        var directives = fs.readdirSync('directives/');
        var modules = [];
        var file = 'var app = angular.module(\'' + appName + '\',[' + modules.join() + ']);\n';



        for (var i=0; i<controllers.length;i++){



            file += 'app.controller(\'' + controllers[i].slice(0,-3) + '\',function($scope){\n\n';

            file += fs.readFileSync('controllers/' + controllers[i]);



            file += '});\n\n\n';
        }


        for (var i=0; i<directives.length;i++){



            file += 'app.directive(\'' + directives[i].slice(0,-5) + '\',function(){\n\n';

            file +=     'return {\n' +
                        'restrict: \'E\',' +
                        'template: \'' + fs.readFileSync('directives/' + directives[i]) + '\'';

            file += '};})\n\n\n';
        }


        saveFile(appName + '.js',file,'compiled');



        var htmlFile = '<html><head><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script><script src="' + appName + '.js"></script></head><body ng-app="' + appName + '">';

        for (var i=0; i<controllers.length;i++){
            controllers[i] = controllers[i].slice(0,-3);
            htmlFile += '<div ng-controller="' + controllers[i] + '"></div>\n';
        }

        for (var i=0; i<directives.length;i++){
            directives[i] = directives[i].slice(0,-5);
            htmlFile += '<' + directives[i] + '></' + directives[i] +'>\n';
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