/* eslint-disable space-before-blocks */
const model = require('../models/article-model');

const getUserId = require('../middleware/user-id');

exports.getArticle = async (req, res, next) => {
  const { id } = req.params;
  const article = { id };

  model.getOneArticle(article).then(
    (data) => {
      if (data.rowCount === 0) {
        res.status(500).json({
          message: 'article does not exist',
        });
      }

      const comments = [];
      model.getComments(id).then(
        (commentdata) => {
          for (let i = 0; i < commentdata.rowCount; i += 1) {
            const tempcomments = {
              commentId: commentdata.rows[i].commentid,
              comment: commentdata.rows[i].comment,
              authorId: commentdata.rows[i].email,
            };
            comments.push(tempcomments);
          }

          res.status(201).json({
            status: 'success',
            data: {
              id: data.rows[0].articleid,
              createdOn: data.rows[0].createdate,
              title: data.rows[0].title,
              article: data.rows[0].article,
              comments,
            },
          });
        },
      ).catch(
        (error) => {
          res.status(500).json({
            message: 'error occoured while fetching comments',
          });
          throw error;
        },
      );
    },
  ).catch(
    (error) => {
      res.status(400).json({
        message: `${error} occoured while fetching article from database`,
      });
      throw error;
    },
  );
};

exports.createArticle = async (req, res, next) => {
  const userId = await getUserId(req);
  const article = {
    title: req.body.title,
    article: req.body.article,
    userId,
  };

  model.create(article).then(
    (data) => {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully created',
          articleId: data.rows[0].id,
          createdOn: data.rows[0].createDate,
          title: data.rows[0].title,
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
