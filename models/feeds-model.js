const pool = require('../config/queries');

class feedsModel {
    static async getAll() {
        const query = 'select articleid, createdate, title, article, email, type from articles inner join users on articles.articleid = users.userid union select gifid, createdate, title, imageurl, email, type from gifs inner join users on gifs.userid = users.userid';
        const result = pool.query(query);
        return result;
    }
}

module.exports = feedsModel;
