/* Create a popup and display an image inside.
 * Also creates an overlay layer that darken the whole window.
 * Require an element with a class "popup-trigger".
*/
$(function() {
    var popupVisible = false;

    $(".popup-trigger").click(function() {
        if(popupVisible == false) {

            $("body").append("<div id='popup-container'>" +
                "<a id='popup-close' title='Close popup'/></div>");

            var container = $("#popup-container");
            
            // Hide it immediately after creation
            container.css({"display":"none"});

            // Attach image to the container
            container.append("<img class='thumbnail' src="+ $(this).data('src') + "></img>");

            // Add the mask layer
            $("body").append("<div id='overlay-effect'></div>");
            var overlayEffect = $("#overlay-effect");

            // Clicking the close button also hides the popup
            var closeButton = $("#popup-close");
            closeButton.click(function() {
                 hidePopup([container, overlayEffect, closeButton]);
            });

            // Clicking anywhere on the mask layer hide the popup
            overlayEffect.click(function(){
                hidePopup([container, overlayEffect, closeButton]);
            });

            // Center the popup in the window
            container.css({
                "position": "absolute",
                "width": $(this).data("width"),
                "height": $(this).data("height"),
                "top": 300,//$(document).height()/2 - container.height()/2,
                "left": $(document).width()/2 - $(this).data("width")/2
            });

            // Show everything
            container.fadeIn();
            overlayEffect.fadeIn();
            closeButton.fadeIn();

            popupVisible = true;
        }
    });
        
    function hidePopup(elements) {
        $.each(elements, function(idx, element) {
            element.fadeOut(500, function() {$(this).remove()});
        });

        popupVisible = false;
    }
} ,jQuery);