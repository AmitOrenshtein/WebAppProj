$(document).ready(function () {
    getAllProducts();

    $( "#searchForm" ).on( "submit", function( event ) {
        event.preventDefault();
        search();
    });
});

function getAllProducts() {
    $.ajax({
        type: "GET",
        url:"http://localhost:80/products/",
        success: function(data){
            showProducts(data);
        }
    });
}

function search() {
    let searchText = $("#searchText").val();
    let category = $("#searchCategory").val();
    let supplier = $("#searchSupplier").val();
    let minPrice = $("#searchMinPrice").val();
    let maxPrice = $("#searchMaxPrice").val();
    let filter = {};
    if(searchText !== "")
        filter.name = searchText;
    if(category !== "none")
        filter.category = category;
    if(supplier !== "none")
        filter.supplier = supplier;
    if(minPrice !== "" && minPrice !== 0)
        filter.minPrice = minPrice;
    if(maxPrice !== "" && maxPrice !== 0)
        filter.maxPrice = maxPrice;
    $.ajax({
        type: "POST",
        url:"http://localhost:80/products/search",
        data: filter,
        success: function(data){
            console.log(data);
            showProducts(data);
        },
        error: function (XMLHttpRequest, textStatus, error) {
            alert("Error while purchasing! message: " + XMLHttpRequest.responseText);
        }
    });
    // todo: Send to server with params and get products
}

function showProducts(products) {
    let example = $("#productExample");
    let productsContainer = $("#productsRow");
    productsContainer.html("");
    for(let i = 0; i < products.length; i++) {
        let currProdData = products[i];
        let newProduct = example.clone();
        newProduct.attr("id", i);
        newProduct.find(".prodTitle").html(currProdData.name);
        newProduct.find(".prodDesc").html(currProdData.description);
        newProduct.find(".prodPrice").html(currProdData.price);
        newProduct.find(".prodImg").attr("src", currProdData.image);
        newProduct.on("click", (event) => {
            if(!$(event.target).hasClass("addBtn"))
                productClick(currProdData);
        });
        newProduct.find(".addBtn").on("click", () => {
            addToCart(currProdData._id)
        });
        productsContainer.append(newProduct);
    }
}

function addToCart(prodId) {
    $.ajax({
        type: "POST",
        url:"http://localhost:80/shoppingCart/addToCart",
        data: { prodId: prodId},
        success: function(data){
            window.location.href = "http://localhost:80/cart";
        }
    });
}

function productClick(product) {
    window.location.href = window.location.href + '/product?id='+product._id;
}