const pool = require('../config/queries');

class gifModel {
    static async getOneGif(gif) {
        const query = 'select gifid, createdate, title, imageurl from gifs inner join users on gifs.userid = users.userid where gifid = $1';
        const values = [`${gif.id}`];
        const result = pool.query(query, values);
        return result;
    }
}

module.exports = gifModel;
