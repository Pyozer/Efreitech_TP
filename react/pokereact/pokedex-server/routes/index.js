var { Router } = require('express');
var router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to Pokedex API !');
});

module.exports = router;
