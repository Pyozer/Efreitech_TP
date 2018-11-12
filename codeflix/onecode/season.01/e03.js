const { readFileSync } = require('fs')

module.exports = filepath => readFileSync(filepath, 'utf8')