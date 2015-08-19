var fs = require("fs");


function mergeValues(values, content) {
   //cycle over the keys 
}


function view( templateName, value, response) {
    //Read from the template file
    var fileContents = fs.readFileSync('./views/'+templateName +".html");
    
    fileContents = mergeValues(values, fileContents);
    response.write(fileContents); 

}

module.exports.view = view;