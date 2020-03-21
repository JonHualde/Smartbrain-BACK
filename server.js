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
    host : 'postgresql-lively-42930',
    user : 'postgres',
    password : '$Ragnarok1994$',
    database : 'smart-brain'
  }
})

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

app.listen(process.env.PORT || 3000, () => {
    console.log(`App connected on port ${process.env.PORT}`)
})
