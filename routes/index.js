/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

router.post('/gifs', auth, gifctrl.createGif);

module.exports = router;
