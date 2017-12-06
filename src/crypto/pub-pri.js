let fs = require('fs');
let ursa = require('ursa');
let encoding = require('encoding');
let client = require('../PKI')


let clientPrivate = client.pem;
let clientPublic = client.pub;
var clientModulusBit = 1024;
var clientMaxBit = clientModulusBit / 8;
var clientRealBit = clientMaxBit - 11;
var padding = ursa.RSA_PKCS10_PADDING;

/**
* 加密，使用客户端公钥加密
* @param plain
* @returns {}
* */
exports.pubEncrypt = function (plain) {
    plain = plain || "";
    return pubencrypt(plain, clientPublic, clientRealBit, padding);
};


/**
* 解密，使用客户端私钥解密
* @param cipher
* @returns {[*]}
* */
exports.priDecrypt = function (cipher) {
    cipher = cipher || "";
    return pridecrypt(cipher, clientPrivate, clientMaxBit, padding);
};



/**
* 用于获取内容的字节数
* @param text
* @param coding
* @returns {}
* */
function bytes(text, coding) {
    if (typeof text === 'undefined') {
        throw new Error("must have a arg.");
    }
    coding = coding || 'utf8';
    return Buffer.byteLength(text.toString(), coding);
}
/**
* 公钥加密算法
* @param plain
* @param publicKey
* @param realBit
* @param padding
* @returns {[*]}
* */
function pubencrypt(plain, publicKey, realBit, padding) {
    var start1 = 0;
    var end1 = realBit;
    var result1 = '';
    var originBuff = new Buffer(plain);
    var originByte = bytes(plain, 'utf8');
    while (start1 < originByte) {
        var originTmp = originBuff.slice(start1, end1);
        result1 += publicKey.encrypt(originTmp, 'binary', 'binary', padding);
        start1 += realBit;
        end1 += realBit;
    }

    var encrypted = encoding.convert(result1, 'binary', 'base64');

    return encrypted.toString();
}
/**
 * 私钥解密算法 
* @param cipher
* @param privateKey
* @param maxBit
* @param padding
* @returns {[*]}
* */
function pridecrypt(cipher, privateKey, maxBit, padding) {
    var start2 = 0;
    var end2 = maxBit;
    var result2 = '';
    var cipherBuff = encoding.convert(cipher, 'base64', 'binary');
    var cipherByte = bytes(cipher, 'base64');
    while (start2 < cipherByte) {
        var cipherTmp = cipherBuff.slice(start2, end2);
        result2 += privateKey.decrypt(cipherTmp, 'binary', 'binary', padding);
        start2 += maxBit;
        end2 += maxBit;
    }
    var decrypted = encoding.convert(result2, 'binary', 'utf8');
    return decrypted.toString();
}

