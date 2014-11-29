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
    Job.find({ id:req.param('job') }).exec(function(e,jobs){
      var job = jobs[0]
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
        if(!a){
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs for eval")
      })

    })

        
    //Transcribing example
    Job.create([
      {
        name:"Transcribe This", 
        type:"transcribing",
        reward:0.01,
        desc: "Transcribe the images."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/3xngl5v.jpg',
          type:"transcribing",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/GEFZL.jpg',
          type:"transcribing",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/PYC86jN.png',
          type:"transcribing",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/up8GH.jpg',
          type:"transcribing",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs for transcribing")
      })

    })


    //feature finding example
    Job.create([
      {
        name:"Where are the cats?", 
        type:"featurefinding",
        reward:0.01,
        desc: "circle the cats in the pictures"
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/5F1Vfw5.jpg',
          type:"featurefinding",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/foHaLPC.jpg?1',
          type:"featurefinding",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/MByLD.jpg',
          type:"featurefinding",
          job_id:job.id
        },
        {
          src:'http://i.imgur.com/e1daLmo.jpg',
          type:"featurefinding",
          job_id:job.id
        }

      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs for feature find")
      })

    })

    //impression measuring example
    Job.create([
      {
        name:"How does this make you feel?", 
        type:"impressionmeasuring",
        reward:0.02,
        desc: "on the provided scale, submit how the data makes you feel, i'm making this description really long so i can see how the dashboard looks if a description for one of the things is really long like this one."
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          src:'http://i.imgur.com/eLmmpdR.jpg',
          type:"impressionmeasuring",
          job_id:job.id,
          min:"sad",
          max:"happy"
        },
        {
          src:'http://i.imgur.com/X6qwKTU.png',
          type:"impressionmeasuring",
          job_id:job.id,
          min:"sad",
          max:"happy"
        },
        {
          src:'http://i.imgur.com/zS59sKQ.jpg',
          type:"impressionmeasuring",
          job_id:job.id,
          min:"sad",
          max:"happy"
        },
        {
          src:'http://i.imgur.com/xoz937V.jpg',
          type:"impressionmeasuring",
          job_id:job.id,
          min:"sad",
          max:"happy"
        }
      ]).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }
         console.log("bounced jobs for impressionmeasuring")})


    })
    //inquiry example
    Job.create([
      {
        name:"Are there any cats?", 
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
         console.log("bounced jobs for inquiry")})


    })


    //survey example



    //transcribing example


    //video tagging example
    Job.create([
      {
        name:"when do cats appear", 
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
        res.send("bounced jobs for video")})


    })



  }
};

