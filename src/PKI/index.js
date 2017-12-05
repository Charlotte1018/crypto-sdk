let fs = require('fs');
let ursa = require('ursa');


let client_private = fs.readFileSync('src/csrgen/client_private.key');
let client_public = fs.readFileSync('src/csrgen/client_public.pub');

var client = {
    pub :ursa.createPublicKey(client_public),
    pem :ursa.createPrivateKey(client_private)
};
exports.client=client;