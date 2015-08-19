var Profile = require('./profile.js');


//2. Handle HTTP route GET/ and POST

function home(request, response) {
    
    if (request.url === "/"){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Header\n');
        response.write('Search\n');
        response.end("Footer\n");
    }
    
}

//3. Handle http route get/:username i.e. /chalkers
function user(request, response){
    var username = request.url.replace("/", "");
    if(username.length > 0){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Header\n');
        
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
             response.write(value.username + " has " + value.badges + " badges\n");
             response.end("Footer\n");
        });
        
        studentProfile.on("error", function(error){
            //show error
            response.write(error.message+'\n');
             response.end("Footer\n");
        });
        
        
       
       
    }
}
//4. Functio that handles the reading of file and merge in value


module.exports.home = home;
module.exports.user = user;