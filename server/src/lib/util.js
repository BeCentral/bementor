const bcrypt = require('bcrypt');

exports.hash = (plaintext, saltRounds = 0) => bcrypt.hash(plaintext, saltRounds);
exports.compareHash = (plaintext, hash) => bcrypt.compare(plaintext, hash);
