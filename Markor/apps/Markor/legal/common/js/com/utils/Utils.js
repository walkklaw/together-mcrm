define([

"jquery", "backbone", "com/models/Constants",

], function($, Backbone, Constants) {

  var Utils = Backbone.Model.extend({},

  {

    LANGUAGE_ALIGN_KEY : "%languageAlign%",
    LANGUAGE_ALIGN_OPPOSITE_KEY : "%!languageAlign%", // align opposite to the
    // selected language
    // alignment
    LANGUAGE_ALIGN_LEFT_CLASS : "languageLTR",
    LANGUAGE_ALIGN_RIGHT_CLASS : "languageRTL",

    killApp : function() {
      // WL.App.close();
      if (navigator.app) {
        navigator.app.exitApp();
        return false;
      }
    },
    
    updateNotificationBubble : function(span, value) {
      if (value) {
        span.text(value).addClass("notificationBubble");
      } else {
        span.text("").removeClass("notificationBubble");
      }
    },

    showAlert : function(message, onOk, title, buttonName) {
      if (!title) {
        title = "ModularityPoC";
      }
      if (!buttonName) {
        buttonName = "OK";
      }

      if (navigator.notification) {
        navigator.notification.alert(message, onOk, title, buttonName);
      } else {
        window.alert(message);
        if (onOk) {
          onOk();
        }
      }
    },
    /**
     * convert currency to a number
     * 
     * @param currency,
     *          string
     * @return value, number
     */
    convertCurrencyToNumber : function(currency) {
      var value = 0;
      var isNegative = currency.indexOf("(") != -1;
      currency = currency.replace("$", "");
      currency = currency.replace(/[(),]/g, "");
      if (!isNaN(currency)) {
        value = Number(currency);
      }

      if (isNegative) {
        value *= -1;
      }
      return value;
    },

    /**
     * convert a number to a currency string with $ symbol prefix, thousand
     * place separaters and precision to two decimal places
     * 
     * @param number,
     *          Number
     * @return currency, string
     */
    convertNumberToCurrency : function(number) {
      if (isNaN(number)) {
        return "$0.00";
      }

      // round off the number to max two decimal places
      number = Math.round(number * 100) / 100;
      var decimals = number - Math.floor(number);
      number = Math.floor(number);

      var isNegative = number < 0;
      var currency = "$"
        + String(number).replace(/\-/g, "").split("").reverse().join("")
          .replace(/(.{3}\B)/g, "$1,").split("").reverse().join("");

      if (decimals > 0) {
        var temp = String(Math.round(decimals * 100));
        currency += "." + (temp.length == 1 ? "0" : "") + temp;
      }

      if (currency.indexOf(".") == -1) {
        currency += ".00";
      }

      if (isNegative) {
        currency = "(" + currency + ")";
      }

      return currency;
    },

    /**
     * convert meters to miles
     * 
     * @param meters,
     *          number
     * @return miles, number
     */
    convertMetersToMiles : function(meters) {
      var miles = meters * 0.000621371192;
      return miles;
    },

    /**
     * force a number to be double digits if it's not
     * 
     * @param num
     * @return numString
     */
    forceDoubleDigits : function(num) {
      var numString = String(num);
      if (numString.length < 2) {
        numString = "0" + numString;
      }
      return numString;
    },

    /**
     * load a css file by appending it into the head deprecated, using
     * Modernizr.load instead
     * 
     * @param file,
     *          path to the file
     */
    loadCSSFile : function(file) {
      $("head").append("<link>");
      var css = $("head").children(":last");
      css.attr({
        rel : "stylesheet",
        type : "text/css",
        href : file
      });
    },

    /**
     * check to see if environment is iOS, iphone+ipad
     * 
     * @param none
     * @return boolean
     */
    isiOS : function() {
      var isiOS = WL.Client.getEnvironment() == WL.Environment.IPAD
        || WL.Client.getEnvironment() == WL.Environment.IPHONE;
      return isiOS;
    },

    /**
     * check to see if environment is android
     * 
     * @param none
     * @return boolean
     */
    isAndroid : function() {
      var isAndroid = WL.Client.getEnvironment() == WL.Environment.ANDROID;
      return isAndroid;
    },

    /**
     * convert inches to a feet string
     * 
     * @param length,
     *          int
     * @return lenString, string
     */
    convertInchesToFeet : function(length) {
      var feet = Math.floor(length / 12);
      var inches = length - (feet * 12);
      var lenString = feet + "'" + inches + "\"";
      return lenString;
    },

    /**
     * find strings and replace with localized strings
     * 
     * @param string,
     *          string
     * @param language,
     *          language code string
     * @return string
     */
    applyLocalization : function(string, language) {
      // convert language alignment classes
      var culture = Globalize.culture(language);
      var languageAlignMatch = new RegExp(Utils.LANGUAGE_ALIGN_KEY, 'g');
      string = string.replace(languageAlignMatch,
        (culture.isRTL ? Utils.LANGUAGE_ALIGN_RIGHT_CLASS
          : Utils.LANGUAGE_ALIGN_LEFT_CLASS));
      var languageAlignOppositeMatch = new RegExp(
        Utils.LANGUAGE_ALIGN_OPPOSITE_KEY, 'g');
      string = string.replace(languageAlignOppositeMatch,
        (culture.isRTL ? Utils.LANGUAGE_ALIGN_LEFT_CLASS
          : Utils.LANGUAGE_ALIGN_RIGHT_CLASS));

      // translate strings
      var matches = string.match(/%[^>](.*?)%/g);
      for ( var i in matches) {
        var match = matches[i];
        var replacement = Globalize.localize(match, language);
        string = string.replace(match, replacement);
      }
      return string;
    },

    /**
     * get translation for a key for the currently selected language
     * 
     * @param key,
     *          String
     * @return translation, string
     */
    getTranslation : function(key) {
      var model = MobileRouter.getModel();
      var settings = model.get("settings");
      var translation = Globalize.localize(key, settings.get("language"));
      return translation;
    },

    /**
     * returns if the screen is a phone based on the screen size
     * 
     * @param none
     * @return isPhone, boolean
     */
    isPhone : function() {
      var isPhone = $(window).width() <= Constants.RESOLUTION_PHONE;
      return isPhone;
    },

    /**
     * launch the gallery browser store image on device and receive uri
     * 
     * @param onImage,
     *          function to receive uri to image file on device
     * @param anchor,
     *          DOM element
     */
    getImageFromGallery : function(onImage, anchor) {
      var self = this;
      if (navigator.camera) {
        function onSuccess(image) {
          if (onImage) {
            onImage(image);
          }
        }
        ;

        function onFail(message) {
          console.log('Camera failed because: ' + message);
        }
        ;

        // Take picture using device camera and retrieve path to image in camera
        // roll
        var x = $(anchor).offset().left;
        var y = $(anchor).offset().top;
        var w = $(anchor).width();
        var h = $(anchor).height();
        var popover = new CameraPopoverOptions(x, y, w, h,
          Camera.PopoverArrowDirection.ARROW_ANY);

        var options = {
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
          quality : 45, // previously 5. Stay below 50 per Phonegap doc about
          // IOS memory issues
          // destinationType: Camera.DestinationType.FILE_URI,
          encodingType : Camera.EncodingType.JPEG,
          popoverOptions : popover,
          // saveToPhotoAlbum: true,
          correctOrientation : true,
          // I get OutOfMemoryError on Samsung Galaxy S3 (and other Android) if
          // I don't specify size.
          // see thread:
          // https://groups.google.com/forum/?fromgroups=#!topic/phonegap/YWZlnFUfRjE
          targetWidth : 1024,
          targetHeight : 1024
        };

        navigator.camera.getPicture(onSuccess, onFail, options);
        // cant use Camera.DestinationType.DATA_URL because it causes memory
        // issue on the iphone4
      } else {
        console.log("Photo library not available");
      }
    },

    /**
     * take a picure with the camera
     * 
     * @param onImage,
     *          function to receive to image file on device
     */
    takePhoto : function(onImage) {
      if (navigator.camera) {
        // Take picture using device camera and retrieve path to image in camera
        // roll
        var options = {
          sourceType : Camera.PictureSourceType.CAMERA,
          quality : 45, // previously 5. Stay below 50 per Phonegap doc about
          // IOS memory issues
          destinationType : Camera.DestinationType.FILE_URI,
          encodingType : Camera.EncodingType.JPEG,
          saveToPhotoAlbum : true,
          correctOrientation : true,
          // I get OutOfMemoryError on Samsung Galaxy S3 (and other Android) if
          // I don't specify size.
          // see thread:
          // https://groups.google.com/forum/?fromgroups=#!topic/phonegap/YWZlnFUfRjE
          targetWidth : 1024,
          targetHeight : 1024
        };

        var onFail = function() {
          console.log("Take photo error");
        };

        navigator.camera.getPicture(function(image) {
          if (onImage) {
            onImage(image);
          }
        }, onFail, options);
        // cant use Camera.DestinationType.DATA_URL because it causes memory
        // issue on the iphone4
      } else {
        console.log("Camera capture not available");
      }
    },

    /**
     * show confirm dialog
     * 
     * @param question
     * @param onYes,
     *          function
     * @param onNo,
     *          function
     * @param title
     * @param labels,
     *          comma delimited string
     */
    showConfirmationAlert : function(question, onYes, onNo, title, labels) {
      if (!title) {
        // title = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
        title = Utils.getTranslation("%label.company.name%");
      }

      if (!labels) {
        labels = "Cancel,OK";
      }

      var onConfirm = function(index) {
        if (index == 2) {
          if (onYes) {
            onYes();
          }
        } else {
          if (onNo) {
            onNo();
          }
        }
      };

      if (navigator.notification) {
        navigator.notification.confirm(question, onConfirm, title, labels);
      } else {
        var answer = confirm(question);
        if (answer) {
          onConfirm(2);
        }
      }
    },

  });

  return Utils;

});
