/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

router.patch('/articles/:id', auth, articlectrl.editArticle);


module.exports = router;
