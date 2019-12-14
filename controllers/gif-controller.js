
const model = require('../models/gif-model');

const getUserId = require('../middleware/user-id');


exports.commentGif = async (req, res, next) => {
    const userId = await getUserId(req);
    const gifId = req.params.id;
    const comment = {
        comment: req.body.comment,
        gifId,
        userId,
    };

    await model.comment(comment).then(
        (data) => {
            if (data.rowCount === 0) {
                res.status(500).json({
                    message: 'gif does not exist',
                });
            }

            res.status(200).json({
                status: 'success',
                data: {
                    message: 'Comment successfully created',
                    createdOn: data.rows[0].createdon,
                    gifTitle: data.rows[0].title,
                    comment: data.rows[0].comment,
                },
            });
        },
    ).catch(
        (error) => {
            res.status(500).json({
                message: `error ${error} occoured while adding comment`,
            });
            throw error;
        },
    );
};
