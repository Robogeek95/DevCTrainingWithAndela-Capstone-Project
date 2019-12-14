const pool = require('../config/queries');

class articleModel {
    static async add(gif) {
        const gifQuery = 'INSERT INTO gifs ("title", "imageurl", "publicid", "userid") VALUES($1, $2, $3, $4) RETURNING *';
        const values = [`${gif.title}`, `${gif.imageUrl}`, `${gif.public_id}`, `${gif.userId}`];
        const result = await pool.query(gifQuery, values);
        return result;
      }
}

module.exports = articleModel;
