const express = require('express');

const router = express.Router();

const authcontroller = require('../../controllers/auth-controller');

router.post('/signup', authcontroller.signup);
