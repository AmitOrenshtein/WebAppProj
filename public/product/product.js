let url = new URL(window.location.href);
let product;
$(document).ready(function () {
    getProduct(url.searchParams.get("id"));
    $(".currencySelect").on("change", function (event) {
       changeCurrency($(event.target).val());
    });
});

function getProduct(id) {
    $.ajax({
        type: "GET",
        url:"http://localhost:80/products/"+id,
        success: function(data){
            product = data;
            fillValues();
        }
    });
}

function fillValues() {
    $(".prodTitle").html(product.name);
    $(".prodImg").attr("src", product.image);
    $(".prodCategory").html(product.category);
    $(".prodSupplier").html(product.supplier);
    $(".prodDesc").html(product.description);
    $(".prodPrice").html(product.price.toFixed(2));
    let prodVid = $(".prodVid");
    if(product.video) {
        prodVid.attr("src",product.video);
    } else {
        prodVid.addClass("hidden");
    }
}

function changeCurrency(selectedCurrency) {
    getCurrencies().then(function(currencies) {
        let convertedPrice = (currencies[selectedCurrency] * product.price).toFixed(2);
        $(".prodPrice").html(convertedPrice);
        let currencyChar;
        switch (selectedCurrency) {
            case 'USD':
                currencyChar = '$';
                break;
            case 'ILS':
                currencyChar = '₪';
                break;
            case 'EUR':
                currencyChar = '€';
                break;
            case 'GBP':
                currencyChar = '£';
                break;
        }
        $(".selectedCurrency").html(currencyChar);
    });
}

let currencyRates;
function getCurrencies() {
    return new Promise(function(resolve) {
        if(currencyRates) {
            resolve(currencyRates);
        } else {
            console.log("getting currencies rates from api");
            $.ajax({
                type: "GET",
                url:"https://api.freecurrencyapi.com/v1/latest",
                data: {
                    apikey: '7PNMVqTqwPjC7AvkwzxJPsv7ldfUk0jqnhvRtLyL',
                    base_currency: 'USD',
                    currencies: 'USD,EUR,ILS,GBP'
                },
                success: function(data){
                    currencyRates = data.data;
                    resolve(data.data);
                }
            });
        }
    });
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