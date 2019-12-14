/* eslint-disable space-before-blocks */
const model = require('../models/article-model');

const getUserId = require('../middleware/user-id');

exports.deleteArticle = async (req, res, next) => {
    const { id } = req.params;
    const article = { id };
    model.getOneArticle(article).then(
        (data) => {
            console.log(data.rowCount)
            if (data.rowCount === 0) {
                res.status(500).json({
                    message: 'Article does not exist',
                });
            }
            model.deleteOneArticle(article).then(
                () => {
                    res.status(201).json({
                        status: 'success',
                        data: {
                            message: 'Article successfully deleted',
                        },
                    });
                },
            ).catch(
                (error) => {
                    res.status(400).json({
                        message: `${error} occoured while deleting from Database`,
                    });
                    throw error;
                },
            );
        },
    ).catch(
        (error) => {
            throw error;
        },
    );
};
