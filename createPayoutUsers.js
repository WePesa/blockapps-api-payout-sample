const api = require('blockapps-api')("config.yaml");
const Promise = require("bluebird");

var users = ["victor", "kieren", "jim"];
var usersAndAddresses = [];

Promise.each(users, function(user) {
    return api.bloc.createUser({
      faucet: '1',
      password: "pass",
    },user).then(function(data){
      userAndAddress = {};
      userAndAddress[user] = data;
      usersAndAddresses.push(userAndAddress);
    });
}).then(function() {
    console.log(usersAndAddresses);
});
