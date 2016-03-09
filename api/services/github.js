var q = require('q');
var exec = require('child_process').exec;

module.exports = {
  merge: function(){

    var deferred = q.defer();

    var command = 'curl -H "Authorization: token ' + process.env.GITHUB_OAUTH_TOKEN + '" \
                    -d \'{ "base":"master", \
                          "head":"develop", \
                          "commit_message":"Commit" }\' \
                    https://api.github.com/repos/cepinos/notes/merges';

    child = exec(command, function(error, stdout, stderr){
      var output;
      console.log(stdout);
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