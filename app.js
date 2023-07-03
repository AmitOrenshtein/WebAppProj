const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const products =require('./routes/product')
const login = require("./routes/login");
const shoppingCart = require("./routes/shoppingCart");
//in order to be able to change configs without changing code
const newLocal = require('custom-env')
newLocal.env("test",'./config');

mongoose.connect(process.env.CONNECTION_STRING,
    {useNewUrlParser:true,
    useUnifiedTopology:true});
mongoose.connection.once("open", ()=>{console.log("connected to DB")})

const app = express();
const session = require('express-session');
app.use(session({
    secret: 'foo',
    saveUninitialized: false,
    resave: false
}));

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//app.set('view engine','ejs')
//TODO - confirm below line to correct products file
app.use('/products', products);
app.use("/login", login);
app.use("/shoppingCart/", shoppingCart);
app.listen(process.env.PORT,()=>{console.log("Listening to port")});
