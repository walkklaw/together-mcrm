define([ 'backbone', 'slick', ], function(Backbone, slick) {

  var HomeView = Backbone.View.extend({
    events : {
      'tap #shareCar, #passenger' : 'noFeature',
      'tap #dashboard' : 'dashboard',
      'pageshow': 'render',
    },

    noFeature : function() {
      return this;
    },

    dashboard : function() {
      return this;
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

  return HomeView;
});