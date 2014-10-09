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

      {
        name:"Detection Test Set", 
        type:"featuredetection",
        desc: "Select whether or not a feature exists in a dataset.",
        data: [{src:'http://i.imgur.com/eLmmpdR.jpg'},{src:'http://i.imgur.com/E3aGgDw.jpg'},{src:'http://i.imgur.com/NOGJwjbb.jpg'},{src:'http://i.imgur.com/40cE648b.jpg'},{src:'http://i.imgur.com/VBjPDH1b.jpg'}]
      },
      
      {
        name:"Recognition Test Set", 
        type:"featurerecognition",
        desc: "Select whether or not a feature exists in a dataset.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Change Detection Test Set", 
        type:"changedetection",
        desc: "Select whether or not a feature exists in a dataset.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Captcha Test Set", 
        type:"captchasolving",
        desc: "Select whether or not a feature exists in a dataset.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Impression Test Set", 
        type:"impressionmeasuring",
        desc: "Select whether or not a feature exists in a dataset.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

      {
        name:"Video Tagging Test Set", 
        type:"videotimetagging",
        desc: "Select whether or not a feature exists in a dataset.",
        data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg']
      },

    ]).exec(function(a,b){ console.log(a,b)})





  return res.send("Bounced the database")



  },



  examples: function(req,res){

    return res.view("examples");

  }





};



