/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const gifctrl = require('../controllers/gif-controller');

router.get('/gifs/:id', auth, gifctrl.getGif);


module.exports = router;
