define([
  'jquery',
  'app/Config',
  'handlebars',
],

function($, Config, H) {

  var TemplateUtils = {

    /**
     * process a handlebar template
     * 
     * @param template,
     *          name string to the template without the extension
     * @param params,
     *          object to process the handlebar template
     * @param onTemplateHandler,
     *          function to receive the post processed html of the template
     * @param templateIsFullPath,
     *          boolean, [optional] specifies if the template param specifies
     *          the full path to the template
     * @param async,
     *          boolean [optional], default is true
     */
    getTemplate : function(template, params, onTemplateHandler,
      templateIsFullPath, async) {
      $.ajax({
        type : 'GET',
        url : templateIsFullPath ? template : Config.FOLDER_TEMPLATES
          + template + Config.EXTENSION_TEMPLATES,
        async : typeof async == 'undefined' ? true : async,
        cache : true,
        dataType : 'text',
        success : function(data) {
          Handlebars.registerHelper('gt', function(v1, v2, options) {
            if (v1 > v2) {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          });

          Handlebars.registerHelper('equal', function(v1, v2, options) {
            if (v1 == v2) {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          });

          Handlebars.registerHelper('not', function(v1, options) {
            if (!v1) {
              return options.fn(this);
            } else {
              return options.inverse(this);
            }
          });

          var template = Handlebars.compile(data);
          var html = params ? template(params) : template({});

          if (onTemplateHandler) {
            onTemplateHandler(html);
          }
        }
      });
    },

    template : function(html) {
      Handlebars.registerHelper('gt', function(v1, v2, options) {
        if (v1 > v2) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      });

      Handlebars.registerHelper('equal', function(v1, v2, options) {
        if (v1 == v2) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      });

      Handlebars.registerHelper('not', function(v1, options) {
        if (!v1) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      });

      return Handlebars.compile(html);
    },
  };

  return TemplateUtils;

});