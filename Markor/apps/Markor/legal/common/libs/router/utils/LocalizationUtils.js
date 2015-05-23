define([

"Config", "AjaxUtils", ], function(Config, AjaxUtils) {

  // Remove all the cultures except the defalut language
  function removeUselessLanguage(except) {
    var culture = Globalize.cultures[except];
    Globalize.cultures = {};
    Globalize.cultures[except] = culture;
  }

  // Load the Globalize's culture files, the culture files are recorded in
  // mapping file
  function loadLocalizationFiles(mappingJsonFile, cultureFileRoot) {
    // Get the mapping language from mapping json file
    AjaxUtils.getJSONData(mappingJsonFile, function(mapping) {
      var cultureFiles = [];
      var cultureFile;

      // Record each language file path to array
      for ( var language in mapping) {
        cultureFile = mapping[language].culture;
        cultureFile && cultureFiles.push(cultureFileRoot + cultureFile);
      }

      // load all culture files
      require(cultureFiles, function() {
        onInitialized && onInitialized();
      });
    });
  }

  // Load the messages files in the mapping file
  function loadLanguage(mappingFile, language) {
    // Reset translations for all languages except for the default language
    removeUselessLanguage(language);

    // Load the selected language file if existed in the mapping file
    AjaxUtils.getJSONData(mappingFile, function(mapping) {
      var languageFile;
      if (mapping.hasOwnProperty(language)) {
        languageFile = mapping[language].language;
        if (languageFile) {
          $.getJSON(languageFile, function(data, textStatus, jqXHR) {
            Globalize.addCultureInfo(language, {
              messages : data
            });
          }).fail(function() {
            console.log("Language file failed to load for " + language);
          });
        } else {
          console.log("No language file found for " + language);
        }
      } else {
        console.log("Language not found in mapping: " + language);
      }
    });
  }

  // find strings and replace with localized strings
  function applyLocalization(string, language) {
    var LANGUAGE_ALIGN_KEY = "%languageAlign%";
    // align opposite to the selected language alignment
    var ALIGN_OPPOSITE_KEY = "%!languageAlign%";
    var ALIGN_LEFT_CLASS = "languageLTR";
    var ALIGN_RIGHT_CLASS = "languageRTL";
    var culture;
    var matches;
    var replacement;
    var match;
    
    // convert language alignment classes
    language = language || this.language;
    culture = Globalize.culture(language);

    string = string.replace(new RegExp(LANGUAGE_ALIGN_KEY, 'g'),
      (culture.isRTL ? ALIGN_RIGHT_CLASS : ALIGN_LEFT_CLASS));

    string = string.replace(new RegExp(ALIGN_OPPOSITE_KEY, 'g'),
      (culture.isRTL ? ALIGN_LEFT_CLASS : ALIGN_RIGHT_CLASS));

    // translate strings
    matches = string.match(/%[^>](.*?)%/g);
    for ( var i in matches) {
      match = matches[i];
      replacement = Globalize.localize(match, language);
      string = string.replace(match, replacement);
    }
    return string;
  }

  // Get all the loaded cultures in an array sorted alphabetically
  function getAllCulturesAlphabetically() {
    var cultures = [];
    var culture;
    
    for ( var languageCode in Globalize.cultures) {
      culture = Globalize.cultures[languageCode];
      if (languageCode != "default") {
        cultures.push(culture);
      }
    }

    function sortAlphabetically(a, b) {
      var al = a.language;
      var bl = b.language;
      return al < bl ? -1 : (al > bl ? 1 : 0);
    }
    cultures.sort(sortAlphabetically);
    return cultures;
  }

  var culture = Globalize.culture();
  $.mobile.changePage.defaults.reverse = culture.isRTL;

  loadLanguage(Config.LOCALIZATION_JSON, Config.SETTINGS_DEFAULT_LANGUAGE);
  // loadLanguage(Config.LOCALIZATION_JSON, WL.App.getDeviceLanguage());

  return {
    language : Config.SETTINGS_DEFAULT_LANGUAGE,
    loadLanguage : loadLanguage,
    applyLocalization : applyLocalization,
    getAllCulturesAlphabetically : getAllCulturesAlphabetically,
  };
});