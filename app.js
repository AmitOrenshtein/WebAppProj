const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const products =require('./routes/product')
//in order to be able to change configs without changing code 
const newLocal = require('custom-env')  
newLocal.env(process.env.NODE_ENV,'./config');

mongoose.connect(process.env.CONNECTION_STRING,
    {useNewUrlParser:true,
    useUnifiedTopology:true});
mongoose.connection.once("open", ()=>{console.log("connect to DB")})

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//app.set('view engine','ejs')
//TODO - confirm below line to correct products file
app.use('/products', products);
app.listen(process.env.PORT,()=>{console.log("Listen to server")});

//test 