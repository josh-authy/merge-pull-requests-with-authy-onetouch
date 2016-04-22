/**
 * PullrequestController
 *
 * @description :: Server-side logic for managing pullrequests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// imports
var q = require('q');
var onetouch = require('../services/onetouch.js');
var github = require('../services/github.js');

/**
 * Find or create a pull request
 * @param  {Object} obj Pull Request object
 * @return {promise}
 */
function findOrCreate(obj){
  if(!obj) return;

  var deferred = q.defer();

  obj.pr_id = obj.pull_request.id;

  Pullrequest.findOrCreate({pr_id:obj.pr_id}, obj).exec(function createCB(err, created){
    if(!!err){
      return deferred.reject(err);
    }
    created.pull_request = obj.pull_request;
    created.save();
    return deferred.resolve(created);
  });

  return deferred.promise;

}


/**
 * Receive pull request and record it into onetouch api
 * @param  {Object} req request
 * @param  {Object} res response
 */
function receive(req, res) {

  req.body && findOrCreate(req.body).then(function(pr){
    onetouch.save(pr).then(function(output){
      pr.uuid = output.approval_request.uuid;
      pr.save();
    });
  });

  Pullrequest.find().exec(function (err, pr){
    if (err) {
      return res.negotiate(err);
    }
    return res.json(pr);
  });

}

/**
 * This webhook is call when a pull request is aproved. This will merge the pull request
 * @param  {Object} req request
 * @param  {Object} res response
 */
function approve(req, res) {
  if(!req.body || req.body.status !== 'approved') return show();

  Approved.findOrCreate(req.body).exec(function createCB(err, created){});

  var uuid = req.body.uuid;

  Pullrequest.findOne({uuid: uuid}).exec(function(err, pr){ 
    pr && github.merge(pr).then(function(output){
    });
  });

  function show(){
    Approved.find().exec(function (err, pr){
      if (err) {
        return res.negotiate(err);
      }
      return res.json(pr);
    });
  }

}

module.exports = {
	receive: receive,
  approve: approve
};

