define([
  'backbone',
  'view/BaseView',
  'app/DataStore',
  'collection/Customers',
], function(Backbone, BaseView, DataStore, Customers) {

  var CustomerTrackView = BaseView.extend({
    events : {
      'pageshow' : 'render',
      'test': 'createEffectiveCustomerRecord',
      'test': 'createIneffectiveCustomerRecord',
    },

    render : function() {
      this.test();
      return this;
    },

    test: function() {
      $.mobile.changePage('customer_baseinfo.html');
    },
    
    createCustomerRecord : function(isEffective, success) {
      // get the start and end time
      var start, end;

      this.createInColl(new CutomerRecords(), {
        start : start,
        end : end,
        userId : DataStore.user.get('userId'),
        isEffective : isEffective,
      }).then(function() {
        success && success();
      });
    },
    
    createEffectiveCustomerRecord: function() {
      this.createCustomerRecord(true, (function() {
        // get the phone num
        var phone = '13844443333';
        
        // get customer info, if none create a customer
        var customers = new Customers();
        this.loadColl(customers, {
          phones: phone,
        }).then(function() {
          if(customers.length === 0) {
            return this.createInColl(customers, {
              phones : [phone],
            });
          }
        }).then(function() {
          $.mobile.changePage('customer_baseinfo.html', {
            props: customers.at(0),
          });
        });
      }).bind(this));
    },
    
    createIneffectiveCustomerRecord: function() {
      this.createCustomerRecord(false);
    },
  });

  return CustomerTrackView;
});