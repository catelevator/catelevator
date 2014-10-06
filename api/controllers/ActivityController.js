/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  setup:function(req,res){


    Activity.create([
    {
      name:"Feature Detection", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Change detection", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Feature Recognition", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Captcha Solving", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Video Time Tagging", 
      desc: "Select a particular feature amongst several pieces of content."
    },
    {
      name:"Impression measuring", 
      desc: "Select a particular feature amongst several pieces of content."
    }


    ]).exec(function(a,b){ return res.end(a,b)})




  },


  examples: function(req,res){

    return res.view("examples");

  }





};



