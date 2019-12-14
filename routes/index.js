/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const gifctrl = require('../controllers/gif-controller');

router.delete('/gifs/:id', auth, gifctrl.deleteGif);

module.exports = router;
