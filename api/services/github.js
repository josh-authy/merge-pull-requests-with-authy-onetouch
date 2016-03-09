var q = require('q');
var exec = require('child_process').exec;

module.exports = {
  merge: function(pr){

    var deferred = q.defer();

    var command = 'curl -X PUT -H "Authorization: token ' + process.env.GITHUB_OAUTH_TOKEN + '" \
                    -d \'{ "sha":"' + pr.pull_request.head.sha + '", \
                          "commit_message":"' + pr.pull_request.title + '" }\' \
                    ' + pr.pull_request.url + '/merge';

    child = exec(command, function(error, stdout, stderr){
      var output;
      
      if(error !== null)
      {
          return deferred.reject(error);
      }

      output = JSON.parse(stdout);
      return deferred.resolve(output);

    });

    return deferred.promise;

  }
}