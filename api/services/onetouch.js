var commands = require('./commands');

module.exports = {
  save: function(pr){
    var command = 'curl "http://api.authy.com/onetouch/json/users/' + process.env.AUTHY_USER_ID + '/approval_requests" \
                    -d api_key="' + process.env.AUTHY_API_KEY + '" \
                    -d message="Pull Request - ' + pr.pull_request.base.repo.name + '" \
                    -d details[title]="' + pr.pull_request.title + '" \
                    -d details[from]="' + pr.pull_request.head.label + '" \
                    -d details[to]="' + pr.pull_request.base.label + '" \
                    -d details[link]="<a href=\"' + pr.pull_request.html_url + '\">' + pr.pull_request.html_url + '</a>" \
                    -d seconds_to_expire=0';
    // -d details[body]="' + pr.pull_request.body + '" \
    // -d details[username]="' + pr.pull_request.user.login + '" \
                    
    return commands.run(command);
  }
};