const express = require('express')
const router = express.Router()
const User = require('../models/users') 

router.post('/', async (req, res) => {
    const user = new User({
      surname: req.body.surname,
      name: req.body.name,
      username: req.body.username, 
      email: req.body.email,
      password: req.body.password
    })
  
    try {
        const user = await User.findOne({ username: username});
        
        if(user) {
            res.status(409).json({ message : "Username existe déjà"});
        }else{
            const newUser = await user.save()
            res.status(201).json(newUser)
        }
    }catch(err) {
        res.status(500).json({ message : err.message })
    }
})
  
module.exports = router;