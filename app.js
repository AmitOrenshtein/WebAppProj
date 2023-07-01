const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'foo',
    saveUninitialized: false,
    resave: false
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/login"));
app.use("/shoppingCart/", require("./routes/shoppingCart"));
app.listen(80);
console.log("server up and listening on port 80");
