/**
 * User model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a user (be it C, R, U, D, or Login),
 * one or more of the functions here should be called.
 *
 * NOTE: You can add authentication logic in this model.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `db.js`.
 */

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (pool) => {
  return {
      create: (user, callback) => {
      let queryString = 'INSERT into users (name, email, password) VALUES ($1, $2, $3)';
      console.log('user model');
      console.log(user);
      let values = [
        user.name,
        user.email,
        user.password
      ];
      pool.query(queryString, values, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  }
}