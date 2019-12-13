const pool = require('../config/queries');

class UserModel {
  static async addUser(user) {
    const userQuery = 'INSERT INTO users ("firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [`${user.firstName}`, `${user.lastName}`, `${user.email}`, `${user.password}`, `${user.gender}`, `${user.jobRole}`, `${user.department}`, `${user.address}`];
    const result = await pool.query(userQuery, values);
    return result;
  }

  static async getUser(email) {
    const getUserQuery = 'SELECT "userid","firstname", "lastname", "email", "password", "gender", "jobrole", "department", "address" FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(getUserQuery, values);
    return result;
  }
}

module.exports = UserModel;
