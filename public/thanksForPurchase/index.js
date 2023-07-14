
window.fbAsyncInit = function() {
    FB.init({
      appId: '632663262259623',
      version: 'v13.0',
      xfbml: true
    });
  };
  
  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

function shareOnFacebook() {
    FB.ui(
      { 
        method: 'share',
        href: 'http://localhost/thanksForPurchase/',
      },
      function(response) {
        if (response && !response.error_code) {
          console.log('Shared on Facebook successfully!');
        } else {
          console.error('Failed to share on Facebook.');
        }
      }
    );
  }
  
  
  document.getElementById('facebook-share').addEventListener('click', shareOnFacebook);
  