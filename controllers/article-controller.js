/* eslint-disable space-before-blocks */
const model = require('../models/article-model');

const getUserId = require('../middleware/user-id');

exports.editArticle = async (req, res, next) => {
    const userId = await getUserId(req);
    const { id } = req.params;
    const article = {
      id,
      title: req.body.title,
      article: req.body.article,
      userId,
    };
  
    model.update(article).then(
      (data) => {
        if (data.rowCount === 0) {
          res.status(500).json({
            message: 'article does not exist',
          });
        }  
  
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Article successfully updated',
            articleId: data.rows[0].id,
            createdOn: data.rows[0].createDate,
            title: data.rows[0].title,
            article: data.rows[0].article,
          },
        });
      },
    ).catch(
      (error) => {
        res.status(400).json({
          message: `${error} occoured while saving to Database`,
        });
        throw error;
      },
    );
  };