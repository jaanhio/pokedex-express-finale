/**
 * Pokemon controller functions.
 *
 * Each pokemon-related route in `routes.js` will call
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

const getPokeDetails = (db) => {
  return (request, response) => {
    let pokemonId = request.params.id;
    console.log(`pokedetails ctrl pokemonId is ${pokemonId}`);
    db.pokemon.getPokeDetails(pokemonId, (error, queryResult) => {
      if (error) {
        // console.log(error.stack);
      }
      else {
        // console.log(queryResult.rows[0]);
        let pokeDetails = queryResult.rows[0];
        response.render('pokemon/pokemon', { pokeDetails: pokeDetails });
      }
    });
  }
};

const deletePokemon = (db) => {
  return (request, response) => {
    let pokemonId = request.params.id;
    console.log(pokemonId);
    db.pokemon.deletePokemon(pokemonId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log(queryResult.rows[0]);
        response.redirect('/');
      }
    });
  }
}

const newForm = (request, response) => {
  response.render('pokemon/new');
}

const create = (db) => {
  return (request, response) => {
    let pokeStats = request.body;
    console.log('pokeStats are');
    console.log(pokeStats);
    db.pokemon.create(pokeStats, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
        response.redirect('/pokemons/new');
      }
      else {
        console.log(queryResult.rows[0]);
        response.redirect('/');
      }
    });
  }
}

const editForm = (db) => {
  return (request, response) => {
    let pokemonId = request.params.id;
    console.log(`editForm ctrl poke control pokeid: ${pokemonId}`);
    // console.log(pokemonId);
    db.pokemon.editForm(pokemonId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log('editForm ctrl queryResult');
        console.log(queryResult.rows[0]);
        let pokeStats = queryResult.rows[0];
        response.render('pokemon/edit', { pokemon: pokeStats });
      }
    });
  }
}

const submitEdit = (db) => {
  return (request, response) => {
    let pokeStats = request.body;
    let pokeId = request.body.id;
    console.log('submitEdit ctrl pokestats and pokeId');
    console.log(pokeStats);
    console.log(`pokeId is ${pokeId}`);
    db.pokemon.submitEdit(pokeStats, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        console.log('submitEdit ctrl queryResult here');
        console.log(queryResult.rows[0]);
        response.redirect(`/pokemons/${pokeId}`);
      }
    });
  }
}

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */

module.exports = {
  getPokeDetails,
  deletePokemon,
  newForm,
  create,
  editForm,
  submitEdit
};
