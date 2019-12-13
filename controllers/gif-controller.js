
const model = require('../models/gif-model');

const cloudstorage = require('../middleware/cloud-config');

const getUserId = require('../middleware/user-id');


exports.createGif = async (req, res) => {
  const file = req.files.image;
  if (file.mimetype !== 'image/gif') {
    return res.status(400).json({
      message: 'We only accept GIF files here',
    });
  }

  const image = await cloudstorage.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) {
      res.status(400).json({
        message: `${error} occoured while declaring image path`,
      });
    }
    return result;
  });

  const userId = await getUserId(req);
  const gif = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: image.secure_url,
    public_id: image.public_id,
    userId,
  };

  model.add(gif).then(
    (data) => {
      res.status(201).json({
        status: 'success',
        data: {
          gifId: data.rows[0].gifid,
          message: 'GIF image successfully posted',
          createdOn: data.rows[0].createdate,
          title: data.rows[0].title,
          description: data.rows[0].description,
          imageUrl: data.rows[0].imageurl,
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