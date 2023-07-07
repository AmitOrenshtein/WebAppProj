tempProdList = [
    {
        id: 1,
        title: "temp product 1",
        description: "This is a fake description.",
        price: 100,
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/u7khoqev6hy2xgsllrnb/revolution-5-mens-road-running-shoes-ZXqS6C.png"
    },
    {
        id: 2,
        title: "temp product 2",
        description: "This is a fake description.",
        price: 100,
        image: "https://www.foodandwine.com/thmb/YFHihzbRtkKggVmQyU9TwwG3wyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-patio-tables-tout-a3d7a767ec4c491b9d7613e8c3c3954a.jpg"
    },
    {
        id: 3,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://www.foodandwine.com/thmb/YFHihzbRtkKggVmQyU9TwwG3wyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-patio-tables-tout-a3d7a767ec4c491b9d7613e8c3c3954a.jpg"
    },
    {
        id: 4,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://www.foodandwine.com/thmb/YFHihzbRtkKggVmQyU9TwwG3wyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-patio-tables-tout-a3d7a767ec4c491b9d7613e8c3c3954a.jpg"
    },
    {
        id: 5,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://www.foodandwine.com/thmb/YFHihzbRtkKggVmQyU9TwwG3wyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-patio-tables-tout-a3d7a767ec4c491b9d7613e8c3c3954a.jpg"
    },
    {
        id: 6,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://www.foodandwine.com/thmb/YFHihzbRtkKggVmQyU9TwwG3wyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-patio-tables-tout-a3d7a767ec4c491b9d7613e8c3c3954a.jpg"
    }
];

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