


/**
 * parse public X to $scpoe.X and changes all X to $scope.X
 * @param controllerText
 */
function parseController(controllerText){

    //each generation of controller gets a private key
    var privateKey = '__angulushPrivates' + Math.floor(Math.random() * 10000).toString();

    controllerText = '$scope.' + privateKey + ' = {};\n\n' + controllerText;


    var varFieldRegex = /public\s*([a-zA-Z\d]+)\s*=/;
    var varMethodRegex = /public\s+([a-zA-Z\d]+)\(/;
    var privateFielddRegex = /private\s*([a-zA-Z\d]+)\s*=/;
    var privateMethodRegex = /private\s+([a-zA-Z\d]+)\(/;

    //private X will be renamed to $scope.__angulushPrivate.X

    //var varNameRegex = /public\s*([a-zA-Z\d]+)\s*=\s*([^;]+)\s*;\n/;  //public X = val;


    //Get the field

    while(varFieldRegex.exec(controllerText)){
        var fieldName = varFieldRegex.exec(controllerText)[1];
        controllerText = controllerText.replace(new RegExp(fieldName,'g'), '$scope.' + fieldName);
        controllerText = controllerText.replace('public $scope.' + fieldName, '$scope.' + fieldName);
    }

    //Private fields

    while(privateFielddRegex.exec(controllerText)){
        var fieldName = privateFielddRegex.exec(controllerText)[1];
        controllerText = controllerText.replace(new RegExp(fieldName,'g'), '$scope.' + privateKey + '.' + fieldName);
        controllerText = controllerText.replace('private $scope.' + privateKey + '.' + fieldName, '$scope.' + privateKey + '.' + fieldName);
    }



    //Get the method

    while (varMethodRegex.exec(controllerText)){
        var methodName = varMethodRegex.exec(controllerText)[1];
        controllerText = controllerText.replace(new RegExp(methodName,'g'), '$scope.' + methodName);
        controllerText = controllerText.replace('public $scope.' + methodName, '$scope.' + methodName + ' = function');
    }


    while (privateMethodRegex.exec(controllerText)){
        var methodName = privateMethodRegex.exec(controllerText)[1];
        controllerText = controllerText.replace(new RegExp(methodName,'g'), '$scope.' + privateKey + '.' + methodName);
        controllerText = controllerText.replace('private $scope.' + privateKey + '.' + methodName, '$scope.' + privateKey + '.' + methodName + ' = function');
    }




    return controllerText;
}


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
        var content =   'public name=\'' + ctrlName + '\';\n\n\n' +
                        'public callout() {\n alert(\'Calling out from the \' + name + \' controller.\');\n}\n\n\n' +
                        '//Init:\n\n\n' +
                        'callout();\n\n';

        saveFile(ctrlName + '.lush',content,'controllers');
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
        var content =   '<div style="border: 1px solid black; width: 300px; margin: 10px; font-size: 20px;padding: 10px;">A ' + directiveName + ' directive</div>';

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



            file += 'app.controller(\'' + controllers[i].slice(0,-5) + '\',function($scope){\n\n';

            file += parseController(fs.readFileSync('controllers/' + controllers[i]).toString());



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



        var htmlFile =          '<html>\n\n ' +
                                '<head>\n\n ' +
                                '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>\n\n ' +
                                '<script src="' + appName + '.js"></script>\n\n ' +
                                '</head>\n\n ' +
                                '<body ng-app="' + appName + '">\n\n ';

        for (var i=0; i<controllers.length;i++){
            controllers[i] = controllers[i].slice(0,-5);
            htmlFile += '<div ng-controller="' + controllers[i] + '"></div>\n';
        }

        for (var i=0; i<directives.length;i++){
            directives[i] = directives[i].slice(0,-5);
            htmlFile += '<' + directives[i] + '></' + directives[i] +'>\n';
        }

        htmlFile += '</body>\n\n </html>';
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
