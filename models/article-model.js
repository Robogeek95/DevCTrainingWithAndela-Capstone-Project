const pool = require('../config/queries');

class articleModel {
    static async update(article) {
        const query = 'UPDATE articles SET title = $1, article = $2 WHERE articleid = $3 RETURNING *';
        const values = [`${article.title}`, `${article.article}`, `${article.id}`];
        const result = pool.query(query, values);
        return result;
      }
}

module.exports = articleModel;
