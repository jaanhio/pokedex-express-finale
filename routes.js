/**
 * Routes file.
 *
 * All routes you want to match in the app should appear here.
 * Upon match, a corresponding controller method should be called.
 *
 * Export as a function using `module.exports`,
 * to be imported (using `require(...)`) in `index.js`.
 */
const userCtrl = require('./controllers/user-ctrl');


module.exports = (app, db) => {

  // handles user login page
  // app.get("/user/login", (request, response) => {
  //   response.render("user/login");
  // });

  app.get('/user/login', userCtrl.loginForm);
  app.get('/user/new', userCtrl.newForm);
  app.post('/user/new', userCtrl.create(db));
  // app.get('/user/logout', userCtrl.logOut);
}
