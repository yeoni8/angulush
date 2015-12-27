//alert('The controller test123 is working.');


var name='ctrlName';


function setName(newName) {

name = newName;
}


function getName() {

return name;
}


console.log(module.exports.name);


for (var property in this) {
    if (this.hasOwnProperty(property)) {
        console.log(property);
    }
}