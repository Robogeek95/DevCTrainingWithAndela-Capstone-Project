const pool = require('../config/queries');

class articleModel {
    static async getComments(userId) {
        const query = 'select commentid, comment, email from article_comments  inner join users on  article_comments.userid = users.userid where articleid = $1';
        const values = [`${userId}`];
        const result = pool.query(query, values);
        return result;
    }

    static async getTest(article) {
        const query = 'select * from articles where title = $1';
        const value = [`${article.title}`];
        const result = pool.query(query, value);
        return result;
    }

    static async deleteTests(article) {
        const query = 'delete from articles where title = $1'
        const value = [`${article.title}`];
        const result = pool.query(query, value);
        return result;
    }
    static async getOneArticle(article) {
        const query = 'select articleid, createdate, title, article from articles inner join users on articles.userid = users.userid where articleid = $1';
        const values = [`${article.id}`];
        const result = pool.query(query, values);
        return result;
    }
}

module.exports = articleModel;
