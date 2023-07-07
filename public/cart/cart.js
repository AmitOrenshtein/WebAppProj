$(document).ready(function () {
    $.ajax({
        type: "GET",
        url:"http://localhost:80/shoppingCart/getCart",
        success: function(data){
            fillCart(data);
        }
    });
});

function fillCart(products) {
    console.log(products);
    if(products === undefined || products.length === 0) {
        $("#fullCart").addClass("hidden");
        $("#emptyCart").removeClass("hidden");
    } else {
        $("#emptyCart").addClass("hidden");
        $("#fullCart").removeClass("hidden");
        let example = $("#exampleRow");
        let cartContainer = $("#cartContainer");
        cartContainer.html("");
        let totalPrice = 0;
        for(let i = 0; i < products.length; i++) {
            let currProdData = products[i];
            let newProduct = example.clone();
            newProduct.attr("id", i);
            newProduct.find(".prodTitle").html(currProdData.title);
            newProduct.find(".prodPrice").html(currProdData.price);
            newProduct.find(".prodImg").attr("src", currProdData.image);
            newProduct.find(".removeBtn").on("click", () => {removeFromCart(i)})
            cartContainer.append(newProduct);
            totalPrice += currProdData.price;
        }
        $("#totalPrice").html(totalPrice);
    }
}

function removeFromCart(cartIndex) {
    $.ajax({
        type: "POST",
        url:"http://localhost:80/shoppingCart/removeFromCart",
        data: { prodIndex: cartIndex},
        success: function(data){
            console.log(data);
            fillCart(data);
        }
    });
}