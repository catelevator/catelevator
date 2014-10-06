// ******************************************************************************
// Some utilities that should be in jquery but aren't.
// ******************************************************************************
// Ben Baker -- www.github.com/benbaker
// Lots nabbed from various awesome people on stackoverflow and elsewhere.
// ******************************************************************************



(function(jQuery) {

  // An eventemitter.
  // Thanks James Padolsey
  
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };

  // An object serializer.
  // I might have made this.

  jQuery.serializeObject = function(){
      var o = {}, a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };



  // define Model constructor
  jQuery.eventModel = function() {
    jQuery.extend( this, jQuery.eventEmitter );
    this.on("error", function(err){console.log(err);})
  }



}(jQuery));

