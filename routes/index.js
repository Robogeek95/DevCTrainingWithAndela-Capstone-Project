/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');


const articlectrl = require('../controllers/article-controller');

router.post('/gifs', auth, gifctrl.createGif);
router.get('/gifs/:id', auth, gifctrl.getGif);
router.get('/articles/:id', auth, articlectrl.getArticle);
router.get('/feed', auth, feedsctrl.feeds);
