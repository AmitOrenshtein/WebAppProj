const express = require('express');
const userRouter = express.Router();

const usersController = require('../controllers/user')

userRouter.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser)

userRouter.route('/:id')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser)
//TODO get user shopping cart

module.exports = userRouter;
