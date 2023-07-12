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
            fillHistory(data);
        },
        error: function (XMLHttpRequest, textStatus, error) {
            console.log(error);
        }
    });
}

function fillHistory(data) {
    console.log(data);
    let historyContainer = $("#purchaseContainer");
    let historyExample = $("#examplePurchaseRow");
    let productExample = $("#exampleProdRow");
    for(let i = 0; i < data.length; i++) {
        let currPurchaseData = data[i];
        let newPurchaseRow = historyExample.clone();
        newPurchaseRow.attr("id", "purchase"+i);
        let date = currPurchaseData.purchaseDate.substring(0, currPurchaseData.purchaseDate.indexOf('T'));
        let time = currPurchaseData.purchaseDate.substring(currPurchaseData.purchaseDate.indexOf('T') + 1, currPurchaseData.purchaseDate.indexOf('.'));
        newPurchaseRow.find(".purchaseTitle").html(date + " " + time);
        let currProductsContainer = newPurchaseRow.find(".productsInPurchase");
        let totalPrice = 0;
        for(let p = 0; p < currPurchaseData.productList.length; p++) {
            let currProdData = currPurchaseData.productList[p];
            let newProduct = productExample.clone();
            newProduct.attr("id", i + "_" + currProdData._id);
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