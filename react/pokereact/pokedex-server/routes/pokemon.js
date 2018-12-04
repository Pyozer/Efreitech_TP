var { Router } = require('express');
var router = Router();

/* GET /pokemons => all pokemons */
router.get('/', (req, res) => {
  res.json({ 'startus': 'success', 'data': req.pokedex, 'code': 200 });
});

/* GET /pokemons/:pokemonId => one pokemon */
router.get('/:pokemonId', (req, res) => {
  const pokemonId = parseInt(req.params.pokemonId || -1) || -1;

  if (pokemonId == -1) {
    res.status(400).json({ 'startus': 'error', 'message': 'You need to provide a correct pokemon ID !', 'code': 400 })
    return;
  }

  let pokemon = req.pokedex.find(value => parseInt(value.ndex) == pokemonId)
  if (!pokemon)
    res.send({ 'startus': 'error', 'message': `There is no pokemon with ${pokemonId} as ID`, 'code': 404 });
  else
    res.send({ 'startus': 'success', 'data': pokemon, 'code': 200 });
});

module.exports = router;
