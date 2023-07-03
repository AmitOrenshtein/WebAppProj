let url = new URL(window.location.href);

$(document).ready(function () {
    getProduct(url.searchParams.get("id"));
});

function getProduct(id) {
    $.ajax({
        type: "GET",
        url:"http://localhost:80/products/"+id,
        success: function(data){
            fillValues(data);
        }
    });
}

function fillValues(product) {
    $(".prodTitle").html(product.name);
    $(".prodImg").attr("src", product.image);
    $(".prodCategory").html(product.category);
    $(".prodSupplier").html(product.supplier);
    $(".prodDesc").html(product.description);
    $(".prodPrice").html(product.price);
    let prodVid = $(".prodVid");
    if(product.video) {
        prodVid.attr("src",product.video);
    } else {
        prodVid.addClass("hidden");
    }
}

function addToCart() {
    $.ajax({
        type: "POST",
        url:"http://localhost:80/shoppingCart/addToCart",
        data: { prodId: url.searchParams.get("id")},
        success: function(data){
            window.location.href = "http://localhost:80/cart";
        }
    });
}