$(document).ready(function () {
    $.ajax({
        type: "GET",
        url:"http://localhost:80/shoppingCart/getCart",
        success: function(data){
            if(data) {
                $("#cartText").html(data);
            } else {
                $("#cartText").html("The cart is empty!");
            }
        }
    });
});