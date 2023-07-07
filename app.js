const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require('./routes/product');
const users = require('./routes/user');
const branches = require('./routes/branch');
//const purchasehistorys = require('./routes/purchasehistory');

const newLocal = require('custom-env')  
newLocal.env(process.env.NODE_ENV,'./config');

mongoose.connect(process.env.CONNECTION_STRING,
    {useNewUrlParser:true,
    useUnifiedTopology:true});
mongoose.connection.once("open", ()=>{console.log("connected to DB")})

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/products', products);
app.use('/users', users);
app.use('/branches', branches);

//app.use('/purchasehistory', purchasehistorys);

app.listen(process.env.PORT,()=>{console.log("Listening to port")});

//test 