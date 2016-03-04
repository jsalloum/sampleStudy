var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var express = require('express');
var helmet = require('helmet');
var http = require('http');
var path = require('path');

(function() {
  'use strict';

  /**
   * @name env
   * @description Node environment.
   * @type {String}
   */
  var env = process.env.NODE_ENV || 'development';

  /**
   * @name app
   * @description Express application.
   * @type {Object}
   */
  var app = express();

  /**
   * @name server
   * @description HTTP server.
   * @type {Object}
   */
  var server = http.createServer(app);

  /**
   * @name port
   * @description Application port.
   * @type {String}
   */
  const port = process.env.PORT || '3000';

  /**
   * @name staticPath
   * @description Path to serve static assets.
   * @type {String}
   */
  var staticPath = env === 'production'
    ? path.join(__dirname, 'dist')
    : path.join(__dirname, 'src', 'app');

  console.log(staticPath);

  /**
   * Bootstrap middleware
   */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(staticPath));
  app.use(helmet());
  app.use(compression());

  /**
   * Server settings and listening
   */
  app.set('port', port);
  server.listen(port);
  server.on('error', () => console.log('Error running server.'));
  server.on('listening', () => console.log(`Server running on port ${server.address().port}`));

  /**
   * Export app for unit testing
   */
  module.exports = app;
})();
