const pool = require('../config/queries');

class articleModel {
    static async getOneArticle(article) {
        const query = 'select articleid, createdate, title, article from articles inner join users on articles.userid = users.userid where articleid = $1';
        const values = [`${article.id}`];
        const result = pool.query(query, values);
        return result;
    }
}

module.exports = articleModel;
