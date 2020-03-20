const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '$Ragnarok1994$',
    database : 'smart-brain'
  }
})
// 
app.use(express.json());
app.use(cors());
 

app.get('/', (req, res) => {
     res.send(db.users)
 })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt, saltRounds) 
 })

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
 })

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
 })

//  app.listen(3000, () => {
//      console.log('app is running on port 3000')
//  })

app.listen(3000, () => {
    console.log('App connected on port 3000')
})

// Another way to define the app port number
// const PORT = process.env.PORT
// console.log(`server is running on ${PORT}`)

// "In the bash console": PORT=3000 node server.js
// The PORT variable will be equal to 3000 in this case