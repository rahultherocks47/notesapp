const express = require("express");
const { signup, signin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);

//We'll export it So that we can access it out of this file too
module.exports = userRouter;