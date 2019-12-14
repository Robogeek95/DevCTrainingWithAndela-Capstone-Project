
const model = require('../models/gif-model');

const getUserId = require('../middleware/user-id');

exports.getGif = async (req, res, next) => {
    const { id } = req.params;
    const gif = { id };
    await model.getOneGif(gif).then(
        (data) => {
            if (data.rowCount === 0) {
                res.status(500).json({
                    message: 'gif does not exist',
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
                        data: {
                            status: 'success',
                            data: {
                                data: data.rows[0].gifid,
                                createdOn: data.rows[0].createdate,
                                title: data.rows[0].title,
                                url: data.rows[0].imageurl,
                                comments,
                            },
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