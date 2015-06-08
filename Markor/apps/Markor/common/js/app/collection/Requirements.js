'use strict';

define([
  "backbone",
  "model/Requirement",
  'app/Config',
], function(Backbone, Requirement, Config) {

  var Requirements = Backbone.Collection.extend({

    url : Config.API_URL + "/requirements",

    model : Requirement,

  });

  Requirements.datas = new Customers([ {
    'createTime' : '2015-06-05',
    'store' : '大连XX店',
    'users' : [ {
      'userId' : 1,
      'role' : 'Primary'
    }, {
      'userId' : 2,
      'role' : 'Secondary'
    } ],
    'earnest' : 0,
    'predictedSale' : 0,
    'customerId' : 1
  }, {
    'createTime' : '2015-06-05',
    'store' : '长沙XX店',
    'users' : [ {
      'userId' : 2,
      'role' : 'Primary'
    }, {
      'userId' : 1,
      'role' : 'Secondary'
    } ],
    'earnest' : 0,
    'predictedSale' : 0,
    'customerId' : 1
  }, {
    'createTime' : '2015-06-05',
    'store' : '大连XX店',
    'users' : [ {
      'userId' : 1,
      'role' : 'Primary'
    }, {
      'userId' : 2,
      'role' : 'Secondary'
    } ],
    'earnest' : 0,
    'predictedSale' : 0,
    'customerId' : 1
  } ]);

  return Requirements;
});
