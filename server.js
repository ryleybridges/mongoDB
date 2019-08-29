const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('./config.json');

const Product = require('./models/products');

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@ryleyscluster-jy7ku.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected to mongo db');
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
    // res.send(allProducts);
    Product.find().then(result => {
      res.send(result);
    });
});


app.get('/product/:id', function(req, res){
    const id = req.params.id
    Product.findById(id).then(result => {
        res.send(result);
    });
});

app.post('/product', function(req, res){
    // console.log('a post request has been made');
    // console.log(req.body);
    // let product = {
    //     name: req.body.name,
    //     price: req.body.price,
    //     message: 'We are about to send this product to a database'
    // };
    // res.send(product);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        res.send(result);
    }).catch(err => res.send(err));
});

app.patch('/editProduct/:id', function(req, res){
  const id = req.params.id;
  Product.updateOne({_id : id}, {name : req.body.name, price: req.body.price}).then(result => {
    res.send(result);
  }).catch(err => res.send(err));
});

app.delete('/products/:id', function(req, res){
  const id = req.params.id;
  Product.deleteOne({_id : id}, function (err) {
    res.send('deleted');
  });
});

const Contact = require('./models/contact');
app.post('/contact', function(req, res){
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: String,
    email: String,
    subject: String,
    message: String
  });

  contact.save().then(result => {
      res.send(result);
  }).catch(err => res.send(err));
});

const Users = require('./models/users');

app.post('/users', function(req, res){
  const hash = bcrypt.hashSync(req.body.password);

  Users.findOne({ type: req.body.username }, function(err, users) {
    console.log('username already exists');
  });

  const newUser = new Users({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: hash
  });

  newUser.save().then(result => {
      res.send(result);
  }).catch(err => res.send(err));

  // res.send('added to database');
});

app.post('/getUser', function(req, res){
  // if(bcrypt.compareSync('password', hash)){
  //   console.log('password matches')
  // }else {
  //   console.log('password does not match');
  // }
});

app.listen(port, () => {
  console.clear();
  console.log(`application is running on port ${port}`)
});
