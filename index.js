const api = require('blockapps-api')('config.yaml');
const Promise = require('bluebird');


var contractSource = `contract Payout {
     address Victor;
     address Jim;
     address Kieren;

     mapping (address => uint) ownershipDistribution;

     function Setup() {
       Victor = 0x$VICTOR-ADDRESS$;
       Jim    = 0x$JIM-ADDRESS$;
       Kieren = 0x$KIEREN-ADDRESS$;

       ownershipDistribution[Victor] = 35;
       ownershipDistribution[Jim]  = 35;
       ownershipDistribution[Kieren] = 30;
     }

     function Dividend() {
       uint bal= this.balance;
       Victor.send(bal * ownershipDistribution[Victor] / 100);
       Jim.send(bal * ownershipDistribution[Jim] / 100);
       Kieren.send(bal * ownershipDistribution[Kieren] / 100);
     }
}`



var password = 'test';
var name = 'testUser';
var contractName = 'Payout';

console.log('Balances of Accounts Prior:')
printPayoutAccounts();

api.bloc.createUser({
  faucet: '1',
  password: password,
},name).then(function(address){
  api.bloc.contract({
    password: password,
    src: contractSource,
    contract: contractName,
  }, name, address).then(function(contractAddress){
    api.bloc.method({
      password: password,
      method: 'Setup',
      args:{},
      value:100,
    }, name, address, contractName, contractAddress)
    .then(function(){
      api.bloc.method({
          password: password,
          args:{},
          method: 'Dividend',
        }, name, address, contractName, contractAddress).then(function(){
          console.log('Balances of Accounts After Payout:')
          printPayoutAccounts();
        });
    })
  })
});

function printPayoutAccounts() {
  //Victor's
  api.strato.account('$VICTOR-ADDRESS$')
  .then(function(account){
    console.log({'Victor':account[0].balance});
  });

  //Kieren's
  api.strato.account('$KIEREN-ADDRESS$')
  .then(function(account){
    console.log({'Kieren':account[0].balance});
  });

  //Jim's
  api.strato.account('$JIM-ADDRESS$')
  .then(function(account){
    console.log({'Jim':account[0].balance});
  });
}
