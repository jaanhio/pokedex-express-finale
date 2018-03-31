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
const bcrypt = require('bcrypt');

module.exports = (pool) => {
  return {
      create: (user, callback) => {
      let queryString = 'INSERT into users (name, email, password) VALUES ($1, $2, $3)';
      bcrypt.hash(user.password, 1, (err, hash) => {
        let values = [
          user.name,
          user.email,
          hash
        ];
        pool.query(queryString, values, (error, queryResult) => {
          callback(error, queryResult);
        });
      });
    },

    login: (user, callback) => {
      let inputUser = [user.name];
      let inputPW = user.password;
      console.log(inputPW);
      console.log(inputUser);
      let queryString = 'SELECT * from users where name = $1';

      pool.query(queryString, inputUser, (error, queryResult) => {
        console.log('querying');
        console.log(queryResult.rows);
        if (error) {
          console.log('error with query');
        }
        else {
          if (queryResult.rows[0] === undefined) {
            console.log('user not found');
            callback(error, queryResult.rows[0]);
          }
          else {
            let hashedPW = queryResult.rows[0].password;
            console.log(`hashedPW is ${hashedPW}`);
            bcrypt.compare(inputPW, hashedPW).then(result => {
              callback(error, result);
            });
          }
        }
      });
    }
  }
}