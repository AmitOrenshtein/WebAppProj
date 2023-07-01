tempProdList = [
    {
        id: 1,
        title: "temp product 1",
        description: "This is a fake description.",
        price: 100,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/330px-Golde33443.jpg"
    },
    {
        id: 2,
        title: "temp product 2",
        description: "This is a fake description.",
        price: 100,
        image: "https://khpet.com/cdn/shop/articles/when-do-puppies-start-walking_800x800.jpg?v=1593020034"
    },
    {
        id: 3,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/330px-Golde33443.jpg"
    },
    {
        id: 4,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://khpet.com/cdn/shop/articles/when-do-puppies-start-walking_800x800.jpg?v=1593020034"
    },
    {
        id: 5,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/330px-Golde33443.jpg"
    },
    {
        id: 6,
        title: "temp product",
        description: "This is a fake description.",
        price: 100,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/330px-Golde33443.jpg"
    }
];

$(document).ready(function () {
    showProducts(tempProdList);

    $( "#searchForm" ).on( "submit", function( event ) {
        event.preventDefault();
        search();
    });
});

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
        newProduct.find(".prodTitle").html(currProdData.title);
        newProduct.find(".prodDesc").html(currProdData.description);
        newProduct.find(".prodPrice").html(currProdData.price);
        newProduct.find(".prodImg").attr("src", currProdData.image);
        newProduct.on("click", () => {productClick(products[i])})
        productsContainer.append(newProduct);
    }
}

function productClick(product) {
    window.location.href = window.location.href + '/product?id='+product.id;
}