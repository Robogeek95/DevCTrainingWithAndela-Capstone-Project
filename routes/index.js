/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const articlectrl = require('../controllers/article-controller');

router.get('/articles/:id', auth, articlectrl.getArticle);


module.exports = router;
