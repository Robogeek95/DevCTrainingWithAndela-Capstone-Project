const pool = require('../config/queries');

class gifModel {
    static async delete(imageUrl) {
        const query = 'DELETE FROM gifs WHERE gifid = $1';
        const values = [`${imageUrl.id}`];
        const result = pool.query(query, values);
        return result;
    }
}

module.exports = gifModel;
