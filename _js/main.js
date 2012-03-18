var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7367508-2']);
_gaq.push(['_setDomainName', 'intransitione.com']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
    // Load some external JavaScript asynchronously.                           
    var loadExternalJS = function (url)                                        
    {                                                                          
        s = document.createElement('script');                                  
        s.type = 'text/javascript';                                            
        s.async = true;                                                        
        s.src = url;                                                           
        document.body.appendChild(s);                                          
                                                                               
    };//end loadExternalJS

	var onLoadCallback = function() {
		// Load share buttons.
        var shareButtonDiv = document.getElementById('share-buttons');
        if (shareButtonDiv) {
            // Twitter tweet button <http://twitter.com/about/resources/tweetbutton>.
            shareButtonDiv.innerHTML += '<a class="twitter-share-button" '+
                'href="http://twitter.com/share" data-count="none" data-text="'+intrcom_title+
                '" data-url="'+intrcom_url+'" data-via="MarcoDinacci">Tweet</a>';
            loadExternalJS('http://platform.twitter.com/widgets.js');

            // Facebook like button <http://developers.facebook.com/docs/reference/plugins/like/>.
            shareButtonDiv.innerHTML += '<iframe class="facebook-like-button" '+
                'src="http://www.facebook.com/plugins/like.php?href='+intrcom_url+
                '&amp;layout=button_count&amp;show_faces=true&amp;width=50&amp;action=like&amp;'+
                'colorscheme=light&amp;height=20" scrolling="no" frameborder="0" '+
                'allowTransparency="true"></iframe>';

            // Linkedin share buttom <http://www.linkedin.com/publishers>.
            shareButtonDiv.innerHTML += '<script type="in/share" data-url="'+intrcom_url+
                '"></script>';
            loadExternalJS('http://platform.linkedin.com/in.js');

            // Google +1 button <http://www.google.com/webmasters/+1/button/>.
            shareButtonDiv.innerHTML += '<g:plusone size="medium" count="false" href="'+intrcom_url+
                '"></g:plusone>';
            loadExternalJS('http://apis.google.com/js/plusone.js');
        }
	}
    
    // Second part of Google Analytics tracking code.                          
    if (location.hostname === 'intransitione.com') {                                  
        loadExternalJS('http://www.google-analytics.com/ga.js');               
    }                                                                          
                                                                               
                                                                               
    // Run onLoadCallback asynchronously.                                      
    window.onload = function ()                                                
    {                                                                          
        setTimeout(onLoadCallback, 1);                                         
                                                                               
    };//end window.onload 
})();
