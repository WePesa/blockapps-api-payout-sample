# Payout Contract sample code for blockapps-api.

## Prerequisites
This sample is using Javascript with NodeJS 5.x.  The current Node installer is 6.x, which requires an additional installation to downgrade the version to 5.x, using NVM.

**NodeJS**

Install NodeJS following the instructions at https://nodejs.org/

**NVM**

Install NVM following the instructions at https://github.com/creationix/nvm/blob/master/README.markdown#install-script

**Set NodeJS version to 5.x**

`nvm use 5`

## Installation

1. Clone the repo:

   `git clone http://github.com/blockapps/blockapps-api-payout-sample ; cd blockapps-api-payout-sample`
1. Install the package

   `npm install`
1. Change the value of $SERVER_URL$ in `config.yaml`, to point to your Strato server.
1. Run `node createPayoutUsers.js` which will generate addresses for Victor, Kieren, and Jim
1. Open index.js and copy those addresses into their owner's fields in the source code for the solidity contract.  
1. Run the sample

   `node index.js`

## api functions list
https://github.com/blockapps/blockapps-api/blob/master/README.md
