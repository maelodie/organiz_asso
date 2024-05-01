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
      const newUser = await user.save()
      res.status(201).json(newUser)
    } catch(err) {
      res.status(400).json({ message : err.message })
    }
})
  
module.exports = router;