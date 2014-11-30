/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var merge = require("merge")
var brain = require("brain")

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

  analyze:function(req,res){
    Job.find(req.param('job')).exec(function(e,jobs){
      var job = jobs[0]
      Task.find({ job_id:job.id}).populate("actions").exec(function(e,tasks){

        var training_set = []

        _.map(tasks, function(task){
          _.map(task.actions, function(action){
            if(action){
              var output = {}
              output[(action.input == 0 ? 'black' : 'white')] = 1
              training_set.push( {input:task.data, output:output })
            }
          })
        })
        if(tasks[0].actions){
          
          console.log(training_set)
          var net = new brain.NeuralNetwork();

          net.train( training_set );

          // var output = net.run({ r: 1, g: 0.4, b: 0 });
          var run = net.toFunction();
          var output = run({ r: 1, g: 0.4, b: 0 });

          var trained_neural_net = run.toString()
          console.log("trained_neural_net",trained_neural_net); 
        }

        res.view( "analysis/"+job.type, { job:job, tasks:tasks, neural_net:(trained_neural_net || null) } );
        // console.log(tasks)

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
    Job.create([
      {
        name:"Find the differences", 
        type:"changedetection",
        reward:0.01,
        desc: "circle the difference"
      }
    ]).exec(function(err,jobs){ 
      console.log(err,jobs)
      var job = jobs[0]
      Task.create([
        {
          //i used the same images for each one because 
          //i'm assuming the images for each task will
          // be the same size and such...
          src1:'http://i.imgur.com/RjIIKPCb.jpg',
          src2: 'http://i.imgur.com/RjIIKPCb.jpg',
          type:"changedetection",
          job_id:job.id
        },
        {
          src1:'http://i.imgur.com/tLbXeb.jpg',
          src2: 'http://i.imgur.com/tLbXeb.jpg',
          type:"changedetection",
          job_id:job.id
        },
        {
          src1:'http://i.imgur.com/BJxFeb.jpg',
          src2:'http://i.imgur.com/BJxFeb.jpg',
          type:"changedetection",
          job_id:job.id
        }
      ]).exec(function(a,b){ 
        if(!a){
          job.taskCount = b.length;
          job.save()
        }

        console.log("bounced jobs for change detection")
      })

    })






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
    

      // compare utils
      
      /**
       * Gets a random color in rgb format as a JSON object
       * @return {[type]} [description]
       */
      var randomColor = function() {
        return {  r: Math.round(Math.random() * 255),
                  g: Math.round(Math.random() * 255),
                  b: Math.round(Math.random() * 255) };
      }
      /**
       * Converts rgb json into a rgb() string
       * @param  {Object} color {r,g,b}
       * @return {rgb(r,g,b)}       
       */
      var toRGB = function(color) {
        return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      }
      /**
       * Normalizes rgb values from 255 to 0-1 by 
       * dividing by 255 
       * *** and rounding so the neural nets have quilibrium.
       * @param  {Object} color 
       * @return {Object}       normalized
       */
      var normalize = function(color) {
        return { r: Math.floor(color.r*10000 / 255)/10000, g: Math.floor(color.g*10000 / 255)/10000, b: Math.floor(color.b*10000 / 255)/10000 };
        // return { r: Math.floor(color.r / 255), g: Math.floor(color.g / 255), b: Math.floor(color.b / 255) };

      }
      /**
       * Makes the sample html for the thing.
       * @param  {color} rgb [description]
       * @return {[type]}     [description]
       */
      toHTML = function(rgb){
        return [ 
            {style:'background-color:'+rgb+';color:black;', html: "<br /> This one <br />"},
            {style:'background-color:'+rgb+';color:white;', html: "<br /> This one <br />"}
          ]
      }
      /**
       * Coolor content constructor
       * @param {[type]} props [description]
       */
      function ColorContent(props){
        for(prop in props)
          this[prop] = props[prop]
        this.type    = "compare"
        this.color   = randomColor()
        this.rgb     = toRGB( this.color )
        this.data    = normalize( this.color )
        this.html    = toHTML( this.rgb )
      }

    /**
     * Array constructor
     * @param  {Number} job_id 
     * @param  {Integer} count  number of items to populate into array
     * @return {Array[Object]}        Array of colorContent Objects
     */
    function colorContentArray(job_id, count){
      var arr = []
      count = count || 20
      while(count--){
        var colorContent =  new ColorContent({job_id:job_id})
        arr.push( colorContent )
      }
      return arr;
    }

    //compare example
    // views: templates/compare
    //        analysis/compare
    Job.create([
      {
        name:"Color contrast", 
        type:"compare",
        reward:0.005,
        desc: "Select which color combination is bestest."
      }
    ]).exec(function(err,jobs){
      console.log(err,jobs)
      var job = jobs[0]
      Task.create(
        colorContentArray( job.id,250 )
      ).exec(function(a,b){ 
        if(!a) {
          job.taskCount = b.length;
          job.save()
        }
        console.log("bounced jobs for compare")})
    })


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
          video_id: 'm2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          video_id: 'm2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          video_id: 'm2UszPwHvXE',
          type:"videotimetagging",
          job_id:job.id
        },
        {
          src:'http://www.youtube.com/embed/m2UszPwHvXE',
          video_id: 'm2UszPwHvXE',
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

