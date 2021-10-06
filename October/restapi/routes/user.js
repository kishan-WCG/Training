const express = require('express')
const router = express.Router()
const userController = require('../controllers/controllers');

// Get all users
router.get('/users', userController.findAll);

// Create a new user
router.post('/users', userController.create);

// Retrieve a single user with id
router.get('/user/:id', userController.findOne);

// Update user with id
router.put('/user/:id', userController.update);

// Delete a user with id
router.delete('/user/:id', userController.delete);

module.exports = router