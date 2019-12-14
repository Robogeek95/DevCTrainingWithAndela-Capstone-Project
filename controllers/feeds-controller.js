const model = require('../models/feeds-model');

const getUserId = require('../middleware/user-id');


exports.feeds = async (req, res, next) => {

    await model.getAll().then(
      (data) => {
        const feed = [];
        for (let i = 0; i < data.rowCount; i += 1) {
          let tempfeed;
          if (data.rows[i].type === 'article') {
            tempfeed = {
              id: data.rows[i].articleid,
              createdOn: data.rows[i].createdate,
              title: data.rows[i].title,
              article: data.rows[i].article,
              authorId: data.rows[i].email,
            };
          } else {
            tempfeed = {
              id: data.rows[i].articleid,
              createdOn: data.rows[i].createdate,
              title: data.rows[i].title,
              url: data.rows[i].article,
              authorId: data.rows[i].email,
            };
          }
          feed.push(tempfeed);
        }
        res.status(200).json({
          status: 'success',
          data: feed,
        });
      },
    ).catch(
      (error) => {
        res.status(500).json({
          message: error,
        });
        throw error;
      },
    );
  };