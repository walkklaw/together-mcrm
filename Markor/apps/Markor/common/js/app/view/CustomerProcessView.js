define([
  'backbone',
  'view/BaseView' ], function(Backbone, BaseView) {

  var CustomerProcessView = BaseView.extend({
    events : {
//      'swiperight .ui-content' : 'next',
      'pageshow' : 'render',
    },

    next: function() {
      $.mobile.changePage('customer_track.html');
    },
    
    render : function() {
      this.$el.find('.slick').slick({
        arrows: false,
        infinite: false,
        dots: true,
        touchThreshold: 10,
        speed: 200
      });
      return this;
    },
  });

  return CustomerProcessView;
});