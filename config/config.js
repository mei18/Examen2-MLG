var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'examen2-mlg'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/miBaseDeDatosMongo'
  },

  test: {
    root: rootPath,
    app: {
      name: 'examen2-mlg'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/examen2-mlg-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'examen2-mlg'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/examen2-mlg-production'
  }
};

module.exports = config[env];
