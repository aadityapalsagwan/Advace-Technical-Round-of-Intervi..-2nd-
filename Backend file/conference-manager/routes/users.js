const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Register User
router.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);

    // Example: save user to MongoDB
    const { fullname, email, password, role } = req.body;
    // Example: save user to MongoDB
    const newUser = new User({ fullname, email, password, role });
    newUser.save()
        .then(savedUser => {
            console.log('User saved:', savedUser);
            res.status(200).json(savedUser); 
        })
        .catch(err => {
            console.error('Error saving user:', err);
            res.status(500).json({ error: 'Failed to register user' });
        });
});


// Get All Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single User by id
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
