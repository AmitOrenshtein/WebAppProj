$(document).ready(function () {
    if (loggedUser) {
        $("#logged").removeClass("hidden");
        $("#notLogged").addClass("hidden");
        getPurchaseHistory();
    } else {
        $("#notLogged").removeClass("hidden");
        $("#logged").addClass("hidden");
    }
});

function getPurchaseHistory() {
    $.ajax({
        type: "GET",
        url: "http://localhost/purchaseHistory/loggedUser",
        success: function (data) {
            /*
            data = [
                {
                    _id: "blabla",
                    userId: "123",
                    purchaseDate: "08/07/2023",
                    productList: [
                        {
                            _id: "147",
                            name: "temp product",
                            image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTVNBVgDTZrFvUARECMzBrur7L34aGgMgeqrY3JE6rWUauX3cRgAjXim93D7cn2UTQM",
                            price: 50
                        },
                        {

                            _id: "258",
                            name: "temp product 2",
                            image: "url",
                            price: 50
                        }
                    ]
                },
                {
                    _id: "blabla",
                    userId: "123",
                    purchaseDate: "15/02/2023",
                    productList: [
                        {
                            _id: "147",
                            name: "More products",
                            image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTVNBVgDTZrFvUARECMzBrur7L34aGgMgeqrY3JE6rWUauX3cRgAjXim93D7cn2UTQM",
                            price: 150
                        },
                        {

                            _id: "258",
                            name: "temp product 2",
                            image: "url",
                            price: 50
                        },
                        {

                            _id: "258",
                            name: "temp product 2",
                            image: "url",
                            price: 50
                        }
                    ]
                },
                {
                    _id: "blabla",
                    userId: "123",
                    purchaseDate: "15/02/2023",
                    productList: [
                        {
                            _id: "147",
                            name: "More products",
                            image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTVNBVgDTZrFvUARECMzBrur7L34aGgMgeqrY3JE6rWUauX3cRgAjXim93D7cn2UTQM",
                            price: 150
                        }
                    ]
                }
            ]
            */
            fillHistory(data);
        },
        error: function (XMLHttpRequest, textStatus, error) {
            console.log(error);
        }
    });
}

function fillHistory(data) {
    let historyContainer = $("#purchaseContainer");
    let historyExample = $("#examplePurchaseRow");
    let productExample = $("#exampleProdRow");
    for(let i = 0; i < data.length; i++) {
        let currPurchaseData = data[i];
        let newPurchaseRow = historyExample.clone();
        newPurchaseRow.attr("id", currPurchaseData._id);
        newPurchaseRow.find(".purchaseTitle").html(currPurchaseData.purchaseDate);
        let currProductsContainer = newPurchaseRow.find(".productsInPurchase");
        let totalPrice = 0;
        for(let p = 0; p < currPurchaseData.productList.length; p++) {
            let currProdData = currPurchaseData.productList[p];
            let newProduct = productExample.clone();
            newProduct.attr("id", currPurchaseData._id + "_" + currProdData._id);
            newProduct.find(".prodTitle").html(currProdData.name);
            newProduct.find(".prodPrice").html(currProdData.price);
            newProduct.find(".prodImg").attr("src", currProdData.image);
            currProductsContainer.append(newProduct);
            totalPrice += currProdData.price;
        }
        newPurchaseRow.find(".purchaseTotalPrice").html(totalPrice);
        historyContainer.append(newPurchaseRow);
    }
}