/**
 * Postgres database configuration.
 *
 * Import models and `pg` package.
 * Initialise configuration object with database credentials.
 * Initialise the connection pool with config object.
 *
 * Export the pool and models as a module using `module.exports`.
 */
const pg = require('pg');
const userModel = require('./models/user-mod');
const pokeModel = require('./models/pokemon-mod');

const configs = {
  user: "jianhaotan",
  host: "127.0.0.1",
  database: "pokemons",
  port: 5432
};

const pool = new pg.Pool(configs);

module.exports = {
  pool: pool,
  user: userModel(pool),
  pokemon: pokeModel(pool)
};