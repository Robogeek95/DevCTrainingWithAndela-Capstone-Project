const pool = require('../config/queries');

class gifModel {
    static async getComments(userId) {
        const query = 'select commentid, comment, email from gif_comments inner join users on  gif_comments.userid = users.userid where gifid = $1';
        const values = [`${userId}`];
        const result = pool.query(query, values);
        return result;
    }

    static async getTest(gif) {
        const query = 'select gifid from gifs where title = $1';
        const values = [`${gif.title}`];
        const result = pool.query(query, values);
        return result;
    }

    static async deleteTests(gif) {
        const query = 'delete from gifs where title = $1'
        const value = [`${gif.title}`];
        const result = pool.query(query, value);
        return result;
    }
}

module.exports = gifModel;
