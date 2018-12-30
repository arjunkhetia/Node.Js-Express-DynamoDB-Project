var express = require('express');
var router = express.Router();
var db = require('../dbconfig');
var async = require('async');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var query = {
      TableName: "dynamoTable"
  };
  var data = await db.getData(query);
  res.render('index', { title: JSON.stringify(data) });
});

module.exports = router;
