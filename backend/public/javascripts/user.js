var randomstring = require('randomstring');

// Structure: {username: uniqueId}
var userInfo = {};

function isNewUser(username) {
  return !(username in userInfo);
}

function getUniqueId(username) {
  if (!(username in userInfo)) {
    userInfo[username] = randomstring.generate();
  }
  return userInfo[username];
}

exports.getUniqueId = getUniqueId;
exports.isNewUser = isNewUser;