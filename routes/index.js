/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

// const gifctrl = require('../controllers/gif-controller');
// const articlectrl = require('../controllers/article-controller');
// const feedsctrl = require('../controllers/feeds-controller');
router.post('/articles', auth, articlectrl.createArticle);


module.exports = router;
