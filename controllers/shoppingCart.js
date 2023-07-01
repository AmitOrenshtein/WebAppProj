function addToShoppingCart(req, res) {
    console.log("recieved add cart request");
    const { prodId } = req.body;
    console.log(prodId)
    if(prodId) {
        console.log("adding to cart!");
        //todo: Get product from DB
        let prod = {
            id: prodId,
            title: "tempTitle",
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/u7khoqev6hy2xgsllrnb/revolution-5-mens-road-running-shoes-ZXqS6C.png",
            price: 100
        }
        let cart = [];
        if(req.session && req.session.cart)
            cart = req.session.cart;
        cart.push(prod);
        req.session.cart = cart;
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