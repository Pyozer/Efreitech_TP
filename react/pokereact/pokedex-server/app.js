const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index');

// Init pokemon data
let pokedex = []
try {
  pokedex = JSON.parse(fs.readFileSync('./data/pokedex.json', 'utf8'))
} catch (e) {
  throw e
}

const app = express();
const PORT = 3001

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Add pokedex into req object (to be used in routes)
app.use((req, res,  next) => {
  req.pokedex = pokedex
  next()
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    'status': 'error',
    'message': err.message,
    'code': err.status || 500
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
