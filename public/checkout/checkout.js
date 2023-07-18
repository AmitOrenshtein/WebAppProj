$(document).ready(function() {
    if (!loggedUser) {
        window.location.href = "/cart";
    }
    $("#checkoutForm").submit(function(e) {
        e.preventDefault();
        if(validateForm()) {
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
        }
    });
});

function validateForm() {

    let cvvRegExp = new RegExp("^[0-9]{3}$");
    let cardRegExp = new RegExp("^[0-9]{16}$");
    let idRegExp = new RegExp("^[0-9]{9}$");

    let error = "";
    let idNum = $("#IdNumber").val();
    let cardNum = $("#creditCardNumber").val();
    let cvv = $("#cvvNumber").val();

    if(!cvvRegExp.test(cvv)) {
        error += "<br /> CVV needs to be 3 digit only";
    }
    if(!cardRegExp.test(cardNum)) {
        error += "<br /> Card number needs to be 16 digit only";
    }
    if(!idRegExp.test(idNum)) {
        error += "<br /> ID needs to be 9 digit only";
    }

    if(error !== "") {
        $("#validMes").html(error);
        return false;
    } else {
        $("#validMes").html("");
        return false;
    }
}