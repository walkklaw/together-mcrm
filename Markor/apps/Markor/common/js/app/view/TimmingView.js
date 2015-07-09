define([
  'view/BaseView',
], function(BaseView) {

  var TimmingView = BaseView.extend({
    events : {
      'touchend #startTimmingBtn' : 'startTimming',
      'touchend #stopTimmingBtn' : 'stopTimming',
    },

    start : null,
    end : null,

    initialize : function(args) {
      this.resetTimming();
      this.$('#stopTimmingBtn').hide();
    },

    startTimming : function() {
      var start = this.start = moment();

      this.resetTimming();

      this.$('.startTime span').html(start.format('HH:mm:ss'));

      this.$('#startTimmingBtn').hide();
      this.$('#stopTimmingBtn').show();

      this.timmingInterval = setInterval((function() {
        this.timming();
      }).bind(this), 1000);
    },

    stopTimming : function() {
      var end = this.end = moment();
      this.$('.endTime span').html(end.format('HH:mm:ss'));

      this.$('#stopTimmingBtn').hide();
      this.$('#startTimmingBtn').show();

      clearInterval(this.timmingInterval);
    },

    resetTimming : function() {
      var zeros = '00', zeroTime = '00:00:00';
      this.$('.hours').html(zeros);
      this.$('.minutes').html(zeros);
      this.$('.seconds').html(zeros);

      this.$('.startTime span').html(zeroTime);
      this.$('.endTime span').html(zeroTime);
    },

    timming : function() {
      var blankTime = moment('1970-01-01');
      blankTime.add(moment().diff(this.start, 'seconds'), 'seconds');
      this.$('.hours').html(blankTime.format('HH'));
      this.$('.minutes').html(blankTime.format('mm'));
      this.$('.seconds').html(blankTime.format('ss'));
    },

  });

  return TimmingView;
});