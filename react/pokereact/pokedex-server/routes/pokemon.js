const { Router } = require('express');
const router = Router();

/* GET /pokemons => all pokemons */
router.get('/', (req, res) => {
  res.json({ 'status': 'success', 'data': req.pokedex, 'code': 200 });
});

/* GET /pokemons/:pokemonId => one pokemon */
router.get('/:pokemonId', (req, res) => {
  const pokemonId = parseInt(req.params.pokemonId || -1) || -1;

  if (pokemonId == -1) {
    res.status(400).json({ 'status': 'error', 'message': 'You need to provide a correct pokemon ID !', 'code': 400 })
    return;
  }

  let pokemon = req.pokedex.find(value => parseInt(value.ndex) == pokemonId)
  if (!pokemon)
    res.send({ 'status': 'error', 'message': `The pokemon #${pokemonId} is not in our database`, 'code': 404 });
  else
    res.send({ 'status': 'success', 'data': pokemon, 'code': 200 });
});

module.exports = router;
