var Profile = require("./profile.js");

var studentProfile = new Profile("chalkers");

studentProfile.on('end', console.dir);

studentProfile.on("error", console.error);