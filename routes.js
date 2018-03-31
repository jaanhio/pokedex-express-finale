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
const pokeCtrl = require('./controllers/pokemon-ctrl');


module.exports = (app, db) => {


  app.get('/user/login', userCtrl.loginForm);
  app.post('/user/login', userCtrl.login(db));
  app.get('/user/new', userCtrl.newForm);
  app.post('/user/new', userCtrl.create(db));
  app.get('/user/logout', userCtrl.logOut);


  app.get('/pokemons/new', pokeCtrl.newForm);
  app.post('/pokemons/new', pokeCtrl.create(db));
  app.get('/pokemons/:id', pokeCtrl.getPokeDetails(db));
  app.post('/pokemons/:id/delete', pokeCtrl.deletePokemon(db));
  app.get('/pokemons/:id/edit', pokeCtrl.editForm(db));
  app.post('/pokemons/:id/edit', pokeCtrl.submitEdit(db));
}
