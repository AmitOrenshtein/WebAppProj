let url = new URL(window.location.href);

$(document).ready(function () {
    product = getProduct(url.searchParams.get("id"));
    fillValues(product);
});

function getProduct(id) {
    //TODO: Get the product from the server
    return {
        id: 1,
        title: "temp product 1",
        description: "This is a fake description.",
        price: 100,
        category: "shoes",
        supplier: "nike",
        image: "https://m.media-amazon.com/images/I/71KVPm5KJdL._AC_UX575_.jpg",
        video: "https://www.youtube.com/embed/DGcdc9H-tuA"
    }
}

function fillValues(product) {
    $(".prodTitle").html(product.title);
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
            console.log(data);
        }
    });
}