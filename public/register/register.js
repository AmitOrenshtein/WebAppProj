$(document).ready(function() {
    $("#registerForm").submit(function(e) {
        e.preventDefault();
        let username = $("#registerUsername").val();
        let address = $("#registerAddress").val();
        let password = $("#registerPassword").val();
        let rePassword = $("#registerRePassword").val();
        if(password !== rePassword) {
            $("#validMes").html("The passwords don't match!");
        } else {
            $("#validMes").html("");
            $.ajax({
                type: "POST",
                url:"http://localhost:80/users",
                data: {
                    username: username,
                    password: password,
                    deliveryAdress: address
                },
                success: function(data){
                    window.location.href = "http://localhost:80/login";
                },
                error: function (XMLHttpRequest, textStatus, error) {
                    console.log(error);
                }
            });
        }
    });
});