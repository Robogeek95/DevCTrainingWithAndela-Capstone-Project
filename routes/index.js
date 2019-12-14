/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

router.delete('/articles/:id', auth, articlectrl.deleteArticle);

module.exports = router;
