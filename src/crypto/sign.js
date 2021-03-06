let fs = require('fs');
let ursa = require('ursa');
let encoding = require('encoding');
let client = require('../PKI')


let clientPrivate = client.pem;
let clientPublic = client.pub;
let data='LOVE';
let signer=ursa.createSigner('sha256');
let verifier=ursa.createVerifier('sha256');

/**
* 使用私钥对文本进行签名
* @param plain
* @returns {[*]}
* */
exports.sign = function(plain){
    signer.update(data);
    return signer.sign(clientPrivate,'hex');
}

/**
* 使用公钥对文本进行验证
* @param signature
* @returns {[*]}
* */
exports.verify = function(plain,signature){
    verifier.update(plain);
    return verifier.verify(clientPublic,signature,'hex');
}