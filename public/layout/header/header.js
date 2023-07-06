$(document).ready(function () {
    if(loggedUser) {
        $("#loggedHeader").removeClass("hidden");
        $("#loggedUsername").html(loggedUser.username);
    }
    else
        $("#notLoggedHeader").removeClass("hidden");
});