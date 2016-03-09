var commands = require('./commands');

module.exports = {
  merge: function(pr){
    var command = 'curl -X PUT -H "Authorization: token ' + process.env.GITHUB_OAUTH_TOKEN + '" \
                    -d \'{ "sha":"' + pr.pull_request.head.sha + '", \
                          "commit_message":"' + pr.pull_request.title + '" }\' \
                    ' + pr.pull_request.url + '/merge';

    return commands.run(command);
  }
};