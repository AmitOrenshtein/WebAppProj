const ProductService = require('../services/product');
const purchaseHistoryService = require('../services/purchasehistory');
const facebookService = require('../services/fackbookPage');

async function addToShoppingCart(req, res) {
    const { prodId } = req.body;
    if(prodId) {
        const prod = await ProductService.getProductById(prodId);
        if(prod) {
            let prodForCart = {
                id: prodId,
                title: prod.name,
                image: prod.image,
                price: prod.price,
                category: prod.category
            }
            let cart = [];
            if(req.session && req.session.cart)
                cart = req.session.cart;
            cart.push(prodForCart);
            req.session.cart = cart;
        } else {
            console.log("prod with " + prodId + " not found");
        }
    }
    res.send();
}

function removeFromShoppingCart(req, res) {
    const {prodIndex} = req.body;
    if(prodIndex) {
        if(req.session && req.session.cart) {
            let cart = req.session.cart;
            cart.splice(prodIndex, 1);
            req.session.cart = cart;
        }
    }
    getShoppingCart(req, res);
}

function getShoppingCart(req, res) {
    let cart =undefined;
    if(req.session)
        cart = req.session.cart;
    res.send(cart);
}

async function buyShoppingCart(req, res) {
    if(req.session && req.session.loggedUser && req.session.cart && req.session.cart.length > 0) {
        let userId = req.session.loggedUser.id;
        const buyResult = await purchaseHistoryService.createPurchasehistory(userId, req.session.cart);
        if(buyResult) {
            let categoryAmount = [];
            req.session.cart.forEach(prod => {
                if(categoryAmount[prod.category])
                    categoryAmount[prod.category]++;
                else
                    categoryAmount[prod.category] = 1;
            });
            facebookService.publishPostForNewSale(categoryAmount);
        }
        req.session.cart = [];
        res.send("success");
    } else {
        return res.status(400).send('shopping cart is empty!');
    }
}

module.exports = {
    addToShoppingCart,
    removeFromShoppingCart,
    getShoppingCart,
    buyShoppingCart
}