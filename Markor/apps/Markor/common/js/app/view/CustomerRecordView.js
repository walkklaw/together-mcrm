define([
  'view/BaseView',
  'collection/Customers',
  'model/CutomerRecord',
  'model/Customer',
  'view/TimmingView',
  'promise',
], function(BaseView, Customers, CutomerRecord, Customer, TimmingView, P) {

  var CustomerRecordView = BaseView.extend({
    events : {
      'touchend #searchCustomer' : 'addEffectiveCutomerRecord',
      'touchend .onUse' : 'addUneffectiveCutomerRecord',
    },

    initialize : function(args) {
      this.timmingView = new TimmingView({
        el : '#timming',
      });
    },

    createCutomerRecord : function() {
      var timmingView = this.timmingView;
      return new CutomerRecord({
        start : timmingView.start.format(),
        end : timmingView.end.format(),
        isEffective : !!phone,
      });
    },

    // steps: validate end date and phone
    // create record
    // fetch customer by phone
    // if customer is none then create one and save it
    // save the record with user id
    // change page
    addEffectiveCutomerRecord : function() {
      var phone = this.$('#phone').val();
      var customers = new Customers();
      var record, customer, pro;
      if (this.timmingView.end && /^\d{11,15}$/.test(phone)) {
        record = this.createCutomerRecord();
        new Promise(function(resolve, reject) {
          customers.fetch({
            data : {
              phones : phone,
            },
            success : resolve,
            error : function() {
              customer = new Customer({
                _id : 1,
              });
              resolve();
            },
          });
        }).then(function() {
          customer = customers.length > 0 ? customers.at(0) : null;
          if (!customer) { return new Promise(function(resolve, reject) {
            customer = new Customer({
              phones : [ phone ],
            }).save({}, {
              success : resolve,
              error : function() {
                customer = new Customer({
                  _id : 1,
                });
                resolve();
              },
            });
          }); }
        }).then(function() {
          record.save({
            userId : customer.get('_id'),
          }, {
            success : function() {
              $.mobile.changePage('customer_baseinfo.html');
            },
          });
        });
      }
    },

    addUneffectiveCutomerRecord : function() {
      if (this.timmingView.end) {
        this.createCutomerRecord().save();
      }
    },

  });

  return CustomerRecordView;
});