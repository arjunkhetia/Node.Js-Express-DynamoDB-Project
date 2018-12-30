# Node-Express-DynamoDB Project   ![Version][version-image]

![Linux Build][linuxbuild-image]
![Windows Build][windowsbuild-image]
![NSP Status][nspstatus-image]
![Test Coverage][coverage-image]
![Dependency Status][dependency-image]
![devDependencies Status][devdependency-image]

The quickest way to get start with Node.Js & Express, just clone the project:

```bash
$ git clone https://github.com/arjunkhetia/Node.Js-Express-Project.git
```

Install dependencies:

```bash
$ npm install
```

Start Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```

# Nodemon

Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

Start Express.js app with nodemon at `http://localhost:3000/`:

```bash
$ nodemon bin/www
```

# Logger - Morgan & Winston

Morgan - HTTP request logger middleware for node.js:

```js
var logger = require('morgan');
app.use(logger('dev'));
```

Winston - is designed to be a simple and universal logging library with support for multiple transports:

```js
var logger = require('winston');
```

# Rotating File Stream

To provide an automated rotation of Express/Connect logs or anything else that writes to a log on a regular basis that needs to be rotated based on date.

```js
var rfs    = require('rotating-file-stream');
var stream = rfs('file.log', {
    size:     '10M', // rotate every 10 MegaBytes written
    interval: '1d',  // rotate daily
    compress: 'gzip' // compress rotated files
});
```

# Dynamo Database Connectivity (with connection pool)

The AWS SDK for JavaScript. A Connection Pool is a cache of database connections maintained by your driver so that connections can be re-used when new connections to the database are required.

```js
var AWS = require('aws-sdk');
var http = require('http');
var agent = new http.Agent({
   maxSockets: 5 // Set the maximum number of connections per origin.
});
AWS.config.update({
  region: 'us-west-2', // The region whose servers you want to send your requests to by default.
  endpoint: 'http://localhost:8000', // The endpoint URL for sending requests to.
  httpOptions:{
      agent: agent, // The Agent object to perform HTTP requests with.
      connectTimeout: 1000, // Sets the socket to timeout after failing to establish a connection with the server after connectTimeout milliseconds.
      timeout: 60000 // Sets the socket to timeout after timeout milliseconds of inactivity on the socket. (Default: 120000)
  },
  maxRetries: 15, // The maximum amount of retries to attempt with a request.
  sslEnabled: false // Enable SSL for requests.
});
var dynamodb = new AWS.DynamoDB();
```

[version-image]: https://img.shields.io/badge/Version-1.0.0-orange.svg
[linuxbuild-image]: https://img.shields.io/badge/Linux-passing-brightgreen.svg
[windowsbuild-image]: https://img.shields.io/badge/Windows-passing-brightgreen.svg
[nspstatus-image]: https://img.shields.io/badge/nsp-no_known_vulns-blue.svg
[coverage-image]: https://img.shields.io/coveralls/expressjs/express/master.svg
[dependency-image]: https://img.shields.io/badge/dependencies-up_to_date-brightgreen.svg
[devdependency-image]: https://img.shields.io/badge/devdependencies-up_to_date-yellow.svg
