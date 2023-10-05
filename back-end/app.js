const express = require('express');
const User = require('./src/controllers/user.controller.js');
const Product = require('./src/controllers/food.controller.js')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.post('/login', User.find)
app.post('/login/create', User.create)
app.get('/product', Product.index)
app.get('/product/:id', Product.find)
app.post('/product', Product.create)
app.put('/product/:id', Product.update)
app.delete('/product/:id', Product.delete)
app.listen(8000, () => {
    console.log('Servidor iniciado na porta 8000.');
  });
