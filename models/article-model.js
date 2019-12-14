const pool = require('../config/queries');

class articleModel {
    static async deleteOneArticle(article) {
        const query = 'DELETE FROM articles WHERE articleid = $1';
        const values = [`${article.id}`];
        const result = pool.query(query, values);
        return result;
      }
}

module.exports = articleModel;
