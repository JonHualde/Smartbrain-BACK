const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('Wrong credentials, please try again')
    } else {
     db.select('email', 'hash').from('login')
     .where('email', '=', req.body.email)
     .then(data => {
         const passwordHashed = bcrypt.compareSync(req.body.password, data[0].hash); 
         if (passwordHashed) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then (user => {
                res.json(user[0])
            })
            .catch(err => {
                res.status(400).json('Unable to get a user.')
            })
         } else {
                res.status(400).json('An error occured, please reload the page.')
         }
     })
     .catch(err => {
                res.status(400).json('Something went wrong, please reload the page!')
        })
    }
 }

 module.exports = {
     handleSignin: handleSignin
 }