/* eslint-disable space-before-blocks */
const model = require('../models/article-model');

const getUserId = require('../middleware/user-id');

exports.commentArticle = async (req, res, next) => {
    const userId = await getUserId(req);
    const articleId = req.params.id;
    const comment = {
        comment: req.body.comment,
        articleId,
        userId,
    };

    await model.comment(comment).then(
        (data) => {
            if (data.rowCount === 0) {
                res.status(500).json({
                    message: 'article does not exist',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Comment successfully created',
                    createdOn: data.rows[0].createdon,
                    articleTitle: data.rows[0].title,
                    article: data.rows[0].article,
                    comment: data.rows[0].comment,
                },
            });
        },
    ).catch(
        (error) => {
            res.status(500).json({
                message: `error ${error} occoured while adding comment`,
            });
            console.log(error);
            throw error;
        },
    );
};