var q = require('q');
var exec = require('child_process').exec;

module.exports = {
  run: function(command){

    var deferred = q.defer();

    child = exec(command, function(error, stdout, stderr){
      var output;
      
      if(error !== null){
        return deferred.reject(error);
      }
      
      try {
        output = JSON.parse(stdout);
      } catch (e) {
        output = stdout;
      }
      
      return deferred.resolve(output);

    });

    return deferred.promise;

  }
}