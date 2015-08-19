var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require('querystring');

//2. Handle HTTP route GET/ and POST
var commonHeaders = {'Content-Type': "text/html"};
function home(request, response) {
    
    if (request.url === "/"){

        if (request.method.toLowerCase() === 'get' ){
            
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            //response.write('Header\n');
            renderer.view("search", {}, response);
            //response.write('Search\n');
            renderer.view("footer", {}, response);
            // response.end("Footer\n");
            response.end();
        } else {

            request.on('data', function(postBody){
                console.log(postBody.toString('utf8'));
                var query = querystring.parse(postBody.toString('utf8'));
                response.writeHead(303, {"Location":"/"+query.username});
                response.end();
            });

        }
    }
    
}

//3. Handle http route get/:username i.e. /chalkers
function user(request, response){
    var username = request.url.replace("/", "");
    if(username.length > 0){
        response.writeHead(200, commonHeaders);
        // response.write('Header\n');
        renderer.view("header", {}, response);
        var studentProfile = new Profile(username);
        
        studentProfile.on("end", function(profileJson){
             //show profile
             //sotore the value which we need
             var value = {
                 avatarUrl: profileJson.gravatar_url,
                 username: profileJson.profile_name,
                 badges: profileJson.badges.length,
                 javascriptPoints: profileJson.points.JavaScript
             }
             
             console.log(value.badges);
             
             //simple response
             //response.write(value.username + " has " + value.badges + " badges\n");
             renderer.view("profile",value, response);
             
             //response.end("Footer\n");
             renderer.view("footer",{}, response);
             response.end();
        });
        
        studentProfile.on("error", function(error){
            //show error
            renderer.view("error",{errorMessage: error.message}, response);
            renderer.view("search",{}, response);
            renderer.view("footer",{}, response);
            response.end();
        });
        
        
       
       
    }
}
//4. Functio that handles the reading of file and merge in value


module.exports.home = home;
module.exports.user = user;