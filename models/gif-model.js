const pool = require('../config/queries');

class gifModel {
    static async comment(comment) {
        function writeComment() {
            const query = 'INSERT INTO gif_comments (comment, gifid, userid) VALUES($1, $2, $3) RETURNING *';
            const values = [`${comment.comment}`, `${comment.gifId}`, `${comment.userId}`];
            const result = pool.query(query, values);
            return result;
        }

        let commentid;
        await writeComment().then(
            (data) => {
                commentid = data.rows[0].commentid;
            },
        ).catch(
            (error) => {
                throw error;
            },
        );

        const query = 'SELECT gif_comments.createdon, gifs.title, gif_comments.comment FROM gifs INNER JOIN gif_comments ON gifs.gifid = gif_comments.gifid WHERE commentid = $1';
        const values = [commentid];
        const result = pool.query(query, values);
        return result;
    }
}

module.exports = gifModel;
