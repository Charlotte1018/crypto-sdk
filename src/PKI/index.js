let fs = require('fs');
let ursa = require('ursa');


let client_private = fs.readFileSync('client_private.key');
let client_public = fs.readFileSync('client_public.pub');

var client = {
    pub :ursa.createPublicKey(client_public),
    pem :ursa.createPrivateKey(client_private)
};
exports.client=client;