'use strict';

define([
  "backbone",
  "model/Customer",
  'app/Config',
], function(Backbone, Customer, Config) {

  var Customers = Backbone.Collection.extend({

    url : Config.API_URL + "/customers",

    model : Customer,

  });

  Customers.datas = new Customers([ {
    'name' : '陈',
    'gender' : 'male',
    'phones' : ['13811112222', '13811113333'],
    'age' : 2,
    'birthday' : '1985-01-01',
    'family' : '李女士',
    'characteristic' : '国字脸戴眼镜',
    'comments' : [ {
      'createDate' : '2015-05-01',
      'content' : '座驾：Jeep大切诺基',
      'userId' : 1
    },{
      'createDate' : '2015-05-02',
      'content' : '座驾：宝马',
      'userId' : 1
    } ],
    'userId' : 1
  } ]);

  return Customers;
});
