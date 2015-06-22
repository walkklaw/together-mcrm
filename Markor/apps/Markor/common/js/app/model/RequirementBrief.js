'use strict';

define([
  'backbone',
  'app/Config',
], function(Backbone, Config) {

  var RequirementBrief = Backbone.Model.extend({

    urlRoot : Config.API_URL + '/requirementBriefs',

    defaults : {
      createDate : '',
      store : '',
      level : '',
      primaryUser : '',
      status : '',
    },
    
  });

  return RequirementBrief;
});
