/**
 * User controller functions.
 *
 * Each user-related route in `routes.js` will call
 * one controller function here.
 *
 * Export all functions as a module using `module.exports`,
 * to be imported (using `require(...)`) in `routes.js`.
 */

/**
 * ===========================================
 * Controller logic
 * ===========================================
 */

const bcrypt = require('bcrypt');

const newForm = (request, response) => {
  response.render('user/new');
}

const create = (db) => {
  return (request, response) => {
    let userDetails = request.body;
    console.log(userDetails);
    db.user.create(userDetails, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log('queryResult');
        console.log(queryResult.rows);
        response.cookie('loggedIn', true);
        response.cookie('username', userDetails.name);
        response.redirect('/');
      }
    });
  }
}

const loginForm = (request, response) => {
  response.render('user/login');
}

const logOut = (request, response) => {
  response.clearCookies();
  response.redirect('/');
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  loginForm,
  newForm,
  create,
  logOut
};