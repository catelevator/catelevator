/**
* Job.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name:{type:"string",required:true},
    desc:{type:"string",required:true},
    progress:{type:"string",defaultsTo:0},
    tasks: { collection:"task", via:"job_id" },
    creator: { model:"user", required:true },
  }
};
