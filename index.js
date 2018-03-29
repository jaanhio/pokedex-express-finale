/**
 * Entry point to Express web server.
 *
 * Import external library modules as needed (eg. body-parser, etc).
 */

const express = require('express');
const bcrypt = require('bcrypt');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const db = require('./db');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


// Set handlebars to be the default view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

/**
 * ===================================
 * Routes
 * ===================================
 */

// Import routes to match incoming requests
routes(app, db);

// Root GET request (it doesn't belong in any controller file)
app.get('/', (request, response) => {
  let queryString = 'SELECT * from pokemons';
  db.pool.query(queryString, (error, queryResult) => {
    if (error) {
      console.log('error')
      console.log(error.stack);
    }
    else {
      let pokeArr = queryResult.rows;
      response.render('home', { pokeArr: pokeArr });
    }
  });
});

// Catch all unmatched requests and return 404 not found page
app.get('*', (request, response) => {
  response.render('404');
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');

  // close database connection pool

});
