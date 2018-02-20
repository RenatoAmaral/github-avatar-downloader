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

  Object.keys(contributors).forEach(function (key) {
    console.log(contributors[key]['avatar_url']);
  });
});


function downloadImageByURL() {
  request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')
         .pipe(fs.createWriteStream('./avatars/kvirani.jpg'));


}

