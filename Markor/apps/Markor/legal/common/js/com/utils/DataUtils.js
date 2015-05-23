define(
		[

		"jquery", "backbone", "com/models/Constants",

		],
		function($, Backbone, Constants) {

			var DataUtils = Backbone.Model
					.extend(
							{},

							{

								LOCALIZATION_JSON : "../data/localizations/mapping.json",

								/**
								 * load the json data and store in memory
								 * 
								 * @param file,
								 *            string path to the file
								 * @param onResultHandler,
								 *            function to receive the data
								 * @param async,
								 *            boolean [optional]
								 */
								_getJSONData : function(file, onResultHandler,
										async) {
									$
											.ajax({
												type : "GET",
												url : file,
												async : typeof async == "undefined" ? true
														: async,
												cache : true,
												dataType : "json",
												success : function(data) {
													if (onResultHandler) {
														onResultHandler(data);
													}
												}
											});
								},

								_getDataByAdapter : function(adapter,
										procedure, parameters, onSuccess,
										onFail) {
									WL.Client.invokeProcedure({
										"adapter" : adapter,
										"procedure" : procedure,
										"parameters" : parameters
									}, {
										onSuccess : onSuccess,
										//onFailure : onFail
									});
								},

								/**
								 * initialize localization load all culture
								 * files
								 * 
								 * @param onInitialized,
								 *            function
								 */
								initLocalization : function(onInitialized) {
									var onData = function(mapping) {
										var cultureFiles = [];
										for ( var language in mapping) {
											var cultureFile = mapping[language].culture;
											if (cultureFile) {
												cultureFiles.push("../../"
														+ cultureFile); // fixing
																		// paths
																		// for
																		// intialization
											}
										}

										// load all culture files
										require(cultureFiles, function() {
											if (onInitialized) {
												onInitialized();
											}
										});
									};
									DataUtils
											._getJSONData(
													DataUtils.LOCALIZATION_JSON,
													onData);
								},

								/**
								 * load a language file and unload all others
								 * 
								 * @param language,
								 *            language code string
								 * @param onLoaded,
								 *            function
								 */
								loadLanguage : function(language, onLoaded) {
									// reset translations for all languages
									// except for the default language
									for ( var languageCode in Globalize.cultures) {
										if (languageCode != Constants.SETTINGS_DEFAULT_LANGUAGE) {
											var culture = Globalize.cultures[languageCode];
											culture.messages = {};
										}
									}

									// load selected language file into memory
									// if exists
									var onData = function(mapping) {
										if (mapping.hasOwnProperty(language)) {
											var languageFile = mapping[language].language;
											if (languageFile) {
												$
														.getJSON(
																"../"
																		+ languageFile,
																function(
																		data,
																		textStatus,
																		jqXHR) {
																	Globalize
																			.addCultureInfo(
																					language,
																					{
																						messages : data
																					});
																	if (onLoaded) {
																		onLoaded();
																	}
																})
														.fail(
																function() {
																	console
																			.log("Language file failed to load for "
																					+ language);
																});
											} else {
												console
														.log("No language file found for "
																+ language);
											}
										} else {
											console
													.log("Language not found in mapping: "
															+ language);
										}
									};
									DataUtils
											._getJSONData(
													DataUtils.LOCALIZATION_JSON,
													onData);
								},

								/**
								 * get all the loaded cultures in an array
								 * sorted alphabetically
								 * 
								 * @param none
								 * @return cultures, array of Globalize.culture
								 *         objects
								 */
								getAllCulturesAlphabetically : function() {
									var cultures = [];
									for ( var languageCode in Globalize.cultures) {
										var culture = Globalize.cultures[languageCode];
										if (languageCode != "default") {
											cultures.push(culture);
										}
									}

									function sortAlphabetically(a, b) {
										if (a.language < b.language)
											return -1;
										if (a.language > b.language)
											return 1;
										return 0;
									}
									cultures.sort(sortAlphabetically);
									return cultures;
								},

								/**
								 * get data from local storage
								 * 
								 * @param key,
								 *            string
								 * @return data, string
								 */
								getLocalStorageData : function(key) {
									var data = window.localStorage
											.getItem(Constants.APP_LOCAL_STORAGE_PREFIX
													+ key);
									return data;
								},

								/**
								 * set data to local storage
								 * 
								 * @param key,
								 *            string
								 * @param value,
								 *            string
								 */
								setLocalStorageData : function(key, value) {
									window.localStorage.setItem(
											Constants.APP_LOCAL_STORAGE_PREFIX
													+ key, value);
								},
								
								getRemoteData: function(httpMethod, resfulUrl, ondata, body){
									
										$.ajax({
											type: httpMethod,
											url: resfulUrl,//"http://localhost:8666/messages/users/1",
											data: typeof body == "undefined" ? {} : body,
											success: function( response ){
												if(ondata){
													ondata(response);
												}
												$.mobile.loading("hide");
											},
											beforeSend: function(xhr){
						                     // $.mobile.loading("show");
						                        xhr.setRequestHeader("Accept","application/com.ibm.mobilecoc.coordinatedcare-v1.0+json");
						                    },
						                    timeout: function(){},//ModelsAndCollections.serviceSetting.getTimeout(),
						                    dataType: "json",
						                    error: function( xhr, statusCode, error ){
//						                      Utils.showAlert("ReadyState: " + xhr.readyState + ", Status: " + xhr.status + 
//						                              ", StatusCode: " + statusCode +
//						                              ", ResponseText: " + xhr.responseText, function(){}, 'Error', 'OK');
						                        //if (statusCode == "timeout") {
						                          //  Utils.showAlert("Connection can not be established at this moment, please try again later.", function() {}, 'Error', 'OK');
						                        //}
						                       // $.mobile.loading("hide");
						                    },
						                    complete: function(){
//						                      $.mobile.loading("hide");
						                    },
										});
							
								}
							});

			return DataUtils;

		});