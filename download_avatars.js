var request = require('request');
var GITHUB_TOKEN = require('./secrets.js')
var fs = require('fs');

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

getRepoContributors("jquery", "jquery", function(err, result) {
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

});

function downloadImageByURL(url, filePath) {
  request.get(url)
         .pipe(fs.createWriteStream(`./avatars/${filePath}.jpg`));

}

