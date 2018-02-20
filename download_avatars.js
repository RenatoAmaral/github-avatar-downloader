var request = require('request');
var GITHUB_TOKEN = require('./secrets.js')
var fs = require('fs');
var repoOwner = process.argv[2]
var repoName = process.argv[3]

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }

  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {

  if((repoOwner || repoName) === undefined){
    console.log("\n*** Please add Repository Owner and Name to work ***\n");
  }else{
  console.log("Errors:", err);
  var contributors = JSON.parse(result);
  var login = "";
  var url = "";

  Object.keys(contributors).forEach(function (key) {
    login = (contributors[key]['login']);
    url = (contributors[key]['avatar_url']);
//  console.log(`login:${login}` , `filePath: ${url}` )
    downloadImageByURL(url,login);
  });
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(`./avatars/${filePath}.jpg`));

}






