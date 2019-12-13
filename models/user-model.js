const pool = require('../config/queries');

class UserModel {
  static async getUser(email) {
    const getUserQuery = 'SELECT "userid","firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address" FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(getUserQuery, values);
    return result;
  }
}

module.exports = UserModel;
