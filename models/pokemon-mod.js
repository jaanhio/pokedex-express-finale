/**
 * Pokemon model functions.
 *
 * Any time a database SQL query needs to be executed
 * relating to a pokemon (be it C, R, U, or D),
 * one or more of the functions here should be called.
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
    getPokeDetails: (pokemonId, callback) => {
      let queryString = 'SELECT * from pokemons where id = $1';
      let value = [parseInt(pokemonId, 10)];
      pool.query(queryString, value, (error, queryResult) => {
        callback(error, queryResult);
      });
    },
    deletePokemon: (pokemonId, callback) => {
      let queryString = 'DELETE from pokemons where id = $1';
      let value = [pokemonId];
      console.log(value);
      pool.query(queryString, value, (error, queryResult) => {
        callback(error, queryResult);
      });
    },
    create: (pokeStats, callback) => {
      let queryString = 'INSERT into pokemons (num, name, img, weight, height) VALUES ($1, $2, $3, $4, $5)';
      let num = pokeStats.num;
      let name = pokeStats.name;
      let img = pokeStats.img;
      let weight = pokeStats.weight;
      let height = pokeStats.height;
      let value = [num, name, img, weight, height];
      pool.query(queryString, value, (error, queryResult) => {
        callback(error, queryResult);
      });
    }
  }
}