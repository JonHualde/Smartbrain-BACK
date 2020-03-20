const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    return db.select('*').from('users').where({id})
    .then(user => {
    if (user.length) {
        res.json(user[0])
    } else {
        res.status(400).json('No user found...')
    }
    })
    .catch( err => res.status(400).json("Error, please reload the page"))
}

module.exports = {
    handleProfile: handleProfile
}