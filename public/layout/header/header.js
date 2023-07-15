$(document).ready(function () {
    if(loggedUser) {
        $("#loggedHeader").removeClass("hidden");
        $("#loggedUsername").html(loggedUser.username);
        if(loggedUser.isAdmin) {
            $(".adminLinks").removeClass("hidden");
        }
    }
    else
        $("#notLoggedHeader").removeClass("hidden");
});