
// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
      appId: '632663262259623',
      version: 'v13.0',
      xfbml: true
    });
  };
  
  // Load the Facebook SDK asynchronously
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
        href: 'https://your-website.com/thanks.html', // Replace with the URL of the thanks.html page
      },
      function(response) {
        if (response && !response.error_code) {
          // Sharing was successful
          console.log('Shared on Facebook successfully!');
        } else {
          // Sharing failed or was canceled
          console.error('Failed to share on Facebook.');
        }
      }
    );
  }
  
  
  // Attach the shareOnFacebook function to the button click event
  document.getElementById('facebook-share').addEventListener('click', shareOnFacebook);
  