let urlParams = new URLSearchParams(window.location.search);

$(document).ready(function() {
    console.log("urlparams", urlParams);
    if(urlParams.has("error")) {
        $("#loginValidation").css('display', 'block');
    }
});