let loggedUser = undefined;
$.holdReady(true);
$.ajax({
    type: "GET",
    url:"http://localhost:80/login/getLoggedUser",
    success: function(data){
        console.log("received logged data: ", data);
        loggedUser = data;
        if(window.location.href.includes("admin")) {
            if(!loggedUser || !loggedUser.isAdmin) {
                alert("You are not allowed here!");
                window.location.href = "http://localhost:80";
            }
        }
        $.holdReady(false);
    }
});

$(function(){
    $("#header").load("/layout/header/header.html");
    $("#footer").load("/layout/footer/footer.html");
});