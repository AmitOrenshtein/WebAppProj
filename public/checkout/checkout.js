$(document).ready(function() {
    if (!loggedUser) {
        window.location.href = "/cart";
    }
    $("#checkoutForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"http://localhost:80/shoppingcart/buyCart",
            data: {
            },
            success: function(data){
                $("#checkoutForm").addClass("hidden");
                $("#checkoutMessage").removeClass("hidden");
            },
            error: function (XMLHttpRequest, textStatus, error) {
                alert("Error while purchasing! message: " + XMLHttpRequest.responseText);
            }
        });
    });
});