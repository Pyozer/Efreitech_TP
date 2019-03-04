const { Router } = require('express');
const pokemonRouter = require('./pokemon')
const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to Pokedex API !');
});

router.use('/pokemons', pokemonRouter)

module.exports = router;
