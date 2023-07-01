let loggedUser = undefined;
$.holdReady(true);
$.ajax({
    type: "GET",
    url:"http://localhost:80/getLoggedUser",
    success: function(data){
        console.log("received logged data: ", data);
        loggedUser = data;
        $.holdReady(false);
    }
});

$(function(){
    $("#header").load("/layout/header/header.html");
    $("#footer").load("/layout/footer/footer.html");
});