/**
 * DatasetController
 *
 * @description :: Server-side logic for managing datasets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  setup:function(req,res){


    Dataset.create([

    {
      name:"Detection Test Set", 
      type:"featuredetection",
      desc: "Select whether or not a feature exists in a dataset.",
      data: ['http://i.imgur.com/eLmmpdR.jpg', 'http://i.imgur.com/E3aGgDw.jpg','http://i.imgur.com/NOGJwjbb.jpg','http://i.imgur.com/40cE648b.jpg','http://i.imgur.com/VBjPDH1b.jpg']
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




    ]).exec(function(a,b){ return res.end(a,b)})

  },

};

