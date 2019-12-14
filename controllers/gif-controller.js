
const model = require('../models/gif-model');

const cloudstorage = require('../middleware/cloud-config');

const getUserId = require('../middleware/user-id');

exports.deleteGif = async (req, res, next) => {
    const { id } = req.params;
    const gif = { id };

    model.getOneGif(gif).then(
        (data) => {
            if (data.rowCount === 0) {
                res.status(500).json({
                    message: 'gif does not exist',
                });
            }
        },
    ).catch(
        (error) => {
            throw error;
        },
    );

    model.delete(gif).then(
        () => {
            res.status(201).json({
                status: 'success',
                data: {
                    message: 'gif post successfully deleted',
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
};