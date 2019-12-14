/* eslint-disable space-before-blocks */
const model = require('../models/article-model');

const getUserId = require('../middleware/user-id');


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
