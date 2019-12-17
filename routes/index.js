/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const gifctrl = require('../controllers/gif-controller');
const articlectrl = require('../controllers/article-controller');
const feedsctrl = require('../controllers/feeds-controller');

router.post('/articles', auth, articlectrl.createArticle);
router.post('/gifs', auth, gifctrl.createGif);
router.get('/gifs/:id', auth, gifctrl.getGif);
router.get('/articles/:id', auth, articlectrl.getArticle);
router.get('/feed', auth, feedsctrl.feeds);
