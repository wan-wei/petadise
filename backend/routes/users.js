var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');
const getUniqueId = require('../public/javascripts/user').getUniqueId;
const isNewUser = require('../public/javascripts/user').isNewUser;

router.post('/unique-id', function(req, res, next) {
  // TODO.
  // const username = req.body.username;
  const username = randomstring.generate();
  const newUserFlag = isNewUser(username);
  const uniqueId = getUniqueId(username);
  console.log("isnewuser", newUserFlag)
  res.status(200).send(JSON.stringify({isNewUser: newUserFlag, uniqueId: uniqueId}));
});

module.exports = router;
