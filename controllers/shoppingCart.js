const ProductService = require('../services/product');

async function addToShoppingCart(req, res) {
    console.log("recieved add cart request");
    const { prodId } = req.body;
    console.log(prodId)
    if(prodId) {
        const prod = await ProductService.getProductById(prodId);
        if(prod) {
            let prodForCart = {
                id: prodId,
                title: prod.name,
                image: prod.image,
                price: prod.price
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
            console.log("removed from cart!");
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

module.exports = {
    addToShoppingCart,
    removeFromShoppingCart,
    getShoppingCart
}