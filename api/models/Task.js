/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    job_id: {
      model: 'job'
    },
    actions: {
      collection: 'actions',
      via: 'task_id'
    }
  }
};

