/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index:function(req,res){
    Job.find({}).exec(function(e,jobs){
      console.log("error:",e)
      console.log("jobs:",jobs)
      if(req.user[0])
        res.view("job/index",{ jobs:jobs, user:req.user[0] })
      else
        res.view("job/index",{ jobs:jobs })
    });
  },


  work:function(req,res){
    Job.findOne({ id:req.param('job') }).exec(function(e,job){
      Task.find({ job_id:job.id, limit:2 }).exec(function(e,tasks){
        res.view( "templates/"+job.type, { job:job, tasks:tasks } );
      })
    })
  },


  bounce: function(req,res){
    
    Job.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Job.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })
    
    Task.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Task.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })

    //change detection example

    //evaluation example
    Job.create([
      {
        name:"Solve the captcha", 
        type:"evaluation",
        reward:0.01,
        desc: "Type the letters in the box."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"evaluation",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/NOGJwjbb.jpg',
          type:"evaluation",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"evaluation",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs")
      })

    })


    //feature finding example


    //impression measuring example

    //inquiry example
    Job.create([
      {
        name:"Find the cats", 
        type:"inquiry",
        reward:0.02,
        desc: "Select whether or not a feature exists in a dataset."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"inquiry",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/X6qwKTU.png',
          type:"inquiry",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/zS59sKQ.jpg',
          type:"inquiry",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/xoz937V.jpg',
          type:"inquiry",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }
         console.log("bounced jobs")})


    })


    //survey example



    //transcribing example


    //video tagging example
    Job.create([
      {
        name:"Find the cats", 
        type:"videotimetagging",
        reward:0.02,
        desc: "pause video when you see the cat"
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }
        res.send("bounced jobs")})


    })



  }
};

