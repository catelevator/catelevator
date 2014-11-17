/**
 * Active_jobsController
 *
 * @description :: Server-side logic for managing active_jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

  attributes: {

    job_id: {
      model: 'job'
    },

    user_id: {
      model: 'user'
    },

    // toJSON: function(){
    //   var o = this.toObject();
    //   o.password = null;
    //   return o;
    // }

  }
};

