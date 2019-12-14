/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const feedsctrl = require('../controllers/feeds-controller');

router.get('/feed', auth, feedsctrl.feeds);


module.exports = router;
