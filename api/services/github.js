var q = require('q');
var exec = require('child_process').exec;

module.exports = {
  merge: function(pr){

    var deferred = q.defer();

    var command = 'curl -H "Authorization: token ' + process.env.GITHUB_OAUTH_TOKEN + '" \
                    -d \'{ "base":"' + pr.pull_request.base.label + '", \
                          "head":"' + pr.pull_request.head.label + '", \
                          "commit_message":"' + pr.pull_request.title + '" }\' \
                    ' + pr.pull_request.repository.merges_url;

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