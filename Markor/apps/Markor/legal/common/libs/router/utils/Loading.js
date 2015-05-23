define(
  [ "jquery", ],
  function($) {

    var showingMsg = null;

    // Append the icon in the body
    $("body")
      .append(
        "<div class='loadingOverlay'><span class='loadingIcon'></span><h1 id='loading-message'></h1></div>"
          + "<div class='cover' style='display: none;'></div>");

    return {
      show : function(message) {
        message = message || "";

        // If not showing the icon, then record the message and show it, or if
        // showing 'Processing...' and need to show 'Loading...', then show it
        if (!showingMsg || message === "Loading...") {
          // Show a transparent div to cover the page, so can click nothing by
          // user
          $(".cover").show();

          showingMsg = message;
          typeof message === "string" && $("#loading-message").html(message);
          
          // Show the icon
          $(".loadingOverlay:hidden").show();
        }
      },

      hide : function(message) {
        // If showing the message, then hide it
        if (showingMsg === message) {
          showingMsg = null;
          
          // Hide the icon
          $(".loadingOverlay:visible").hide();
          
          // Hide the transparent div
          $(".cover").hide();
        }
      },
    };

  });