/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require("underscore");


module.exports = {
	
  bounce:function(req,res){


    Activity.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Activity.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })

    Dataset.find({}).exec(function(e,things){
      _.map(things, function(thing){
        Dataset.destroy(thing.id, function(err,done){
          console.log(err,done)
        })
      })
    })



    Activity.create([
    {
      name:"Feature Detection", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Change detection", 
      desc: ""
    },
    {
      name:"Feature Recognition", 
      desc: ""
    },
    {
      name:"Captcha Solving", 
      desc: ""
    },
    {
      name:"Video Time Tagging", 
      desc: ""
    },
    {
      name:"Review", 
      desc: ""
    },
    {
      name:"Survey", 
      desc: ""
    },
    {
      name:"Impression measuring", 
      desc: ""
    }


    ]).exec(function(a,b){ console.log(a,b)})




    Dataset.create([
//not sure if we even use this..but i updated it to have the new names of things --mads
      {
        name:"Feature Finding Test Set", 
        type:"featurefinding",
        desc: "User circles where the specified object is located in the data.",
        data: [{src:'http://i.imgur.com/eLmmpdR.jpg'},{src:'http://i.imgur.com/E3aGgDw.jpg'},{src:'http://i.imgur.com/NOGJwjbb.jpg'},{src:'http://i.imgur.com/40cE648b.jpg'},{src:'http://i.imgur.com/VBjPDH1b.jpg'}]
      },
      
      {
        name:"Inquiry Test Set", 
        type:"inquiry",
        desc: "User selects one of provided answers using the given data. <-- not worded right.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Change Detection Test Set", 
        type:"changedetection",
        desc: "User detects the change between two items of data.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Evaluation Test Set", 
        type:"evaluation",
        desc: "User enters text that provides feedback on the given data.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Impression Test Set", 
        type:"impressionmeasuring",
        desc: "User expresses the level of specified feeling upon looking at the data.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Video Tagging Test Set", 
        type:"videotimetagging",
        desc: "User determines the time in which a certain event happens in the data.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

    ]).exec(function(a,b){ console.log(a,b)})





  return res.send("Bounced the database")



  },



  examples: function(req,res){

    return res.view("examples");

  }





};



