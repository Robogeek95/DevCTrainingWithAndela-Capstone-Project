/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const gifctrl = require('../controllers/gif-controller');

const articlectrl = require('../controllers/article-controller');


router.get('/gifs/:id', auth, gifctrl.getGif);

router.get('/articles/:id', auth, articlectrl.getArticle);


module.exports = router;
