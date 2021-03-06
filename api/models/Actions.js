/**
* Actions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    task_id: {
      model: 'task'
    },
    job_id: {
      model: 'job'
    },
    user_id: {
      model: 'user'
    },

    action_date: {type: "string", defaultsTo: Date.now() },

  },

};

