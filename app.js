
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
// const hbs = require('express-handlebars')
const app = express()
// const api = require('./routes')

const bcrypt = require('bcrypt')
const usersDB = require('userdb')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

console.log('Hasta aquí ok')

var BCRYPT_SALT_ROUNDS = 12;
app.post('/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  // console.log(user, password);

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        return usersDB.saveUser(username, hashedPassword);
    })
    .then(function() {
        res.send();
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });
});

module.exports = app




// app.engine('.hbs', hbs({
//  defaultLayout: 'default',
//  extname: '.hbs'
//}))
//app.set('view engine', '.hbs')

//app.use('/api', api)
//app.get('/login', (req, res) => {
//  res.render('login')
//})
//app.get('/', (req, res) => {
//  res.render('product')
//})

