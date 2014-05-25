'use strict';

FbFriends.App = Backbone.View.extend({
  friends: null,

  initialize: function(options){
    options = options || {};
    _.extend(this, options);
  },

  render: function(){
    this.profilesView.render();
  }
});