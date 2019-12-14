/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const articlectrl = require('../controllers/article-controller');

router.post('/articles/:id/comment', auth, articlectrl.commentArticle);


module.exports = router;
