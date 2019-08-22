const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config.json');
mongoose.connect(`mongodb+srv://ryleyb:${config.MONGO_PASSWORD}@ryleyscluster-jy7ku.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected to mongodb');
});

const allProducts = require('./data/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/allProducts', function(req, res){
  res.send(allProducts);
});

app.get('/product/:id', function(req, res){
  const id = req.params.id;
  for (var i = 0; i < allProducts.length; i++) {
        if(id == allProducts[i].id){
            res.send(allProducts[i]);
            break;
        }
    }
});

app.post('/product', function(req, res){
  // console.log('a post request has been made');
  // console.log(req.body);
  let product = {
    name: req.body.name,
    price: req.body.price,
    message: 'We are about to send this product to a database'
  }
  res.send(product);
})

// app.get('/product/delete/:id', function(req, res){
//   const productID = req.params.id;
//   let filteredData = [];
//   for (var i = 0; i < allProducts.length; i++) {
//         if(allProducts[i].id.toString() === productID){
//             filteredData.push(allProducts[i]);
//         }
//     }
//     res.send(filteredData);
// });
//
// app.get('/product/edit/:id', function(req, res){
//   const productID = req.params.id;
//   let filteredData = [];
//   for (var i = 0; i < allProducts.length; i++) {
//         if(allProducts[i].id.toString() === productID){
//             filteredData.push(allProducts[i]);
//         }
//     }
//     res.send(filteredData);
// });

app.listen(port, () => {
    // console.clear();
    console.log(`application is running on port ${port}`);
});
