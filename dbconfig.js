var AWS = require('aws-sdk');
var async = require('async');
var map = require('map');
var http = require('http');
var agent = new http.Agent({
   maxSockets: 5
});

// Enable for HTTPS requests
// var https = require('https');
// var agent = new https.Agent({
//    maxSockets: 5
// });


var unmarshalItem = require('dynamodb-marshaler').unmarshalItem;
var marshalItem = require('dynamodb-marshaler').marshalItem;

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://localhost:8000',
  httpOptions:{
      agent: agent,
      connectTimeout: 1000
  },
  maxRetries: 15,
  sslEnabled: false
});

var dynamodb = new AWS.DynamoDB();

module.exports.getData = (query) => {
    return new Promise((resolve, reject) => {
      dynamodb.scan(query, function onScan(err, data) {
          if (err) {
              console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
              reject(err);
          } else {
              var result = data.Items.map(unmarshalItem);
              dynamodb = null;
              resolve(result);
          }
      });
    });
}

module.exports.close = () => {
    dynamodb = null;
}
