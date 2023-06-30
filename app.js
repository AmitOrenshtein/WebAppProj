const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const products =require('./routes/productsroute')
const newLocal = require('custom-env')  
newLocal.env(process.env.NODE_ENV,'./config');

mongoose.connect(process.env.CONNECTION_STRING,
    {useNewUrlParser:true,
    useUnifiedTopology:true});

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//app.set('view engine','ejs')
//TODO - confirm below line to correct products file
app.use('/products', productsroute);
app.listen(process.env.PORT);

//test 