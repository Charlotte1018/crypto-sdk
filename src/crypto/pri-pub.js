let fs = require('fs');
let ursa = require('ursa');
let encoding = require('encoding');
let client = require('../PKI')


let clientPrivate = client.client.pem;
let clientPublic = client.client.pub;
var clientModulusBit = 1024;
var clientMaxBit = clientModulusBit / 8;
var clientRealBit = clientMaxBit - 11;
var padding = ursa.RSA_PKCS10_PADDING;




/**
* 加密，使用客户端私钥加密
* @param plain
* @returns {}
* */
exports.priEncrypt = function (plain) {
    plain = plain || "hello world";
    return encrypt(plain, clientPrivate, clientRealBit, padding);
};


/**
* 解密，使用客户端公钥解密
* @param cipher
* @returns {[*]}
* */
exports.pubDecrypt = function (cipher) {
    cipher = cipher || "";
    return decrypt(cipher, clientPublic, clientMaxBit, padding);
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
* 私钥加密算法
* @param plain
* @param privateKey
* @param realBit
* @param padding
* @returns {[*]}
* */
function encrypt(plain, privateKey, realBit, padding) {
    var start1 = 0;
    var end1 = realBit;
    var result1 = '';
    var originBuff = new Buffer(plain);
    var originByte = bytes(plain, 'utf8');
    while (start1 < originByte) {
        var originTmp = originBuff.slice(start1, end1);
        result1 += privateKey.privateEncrypt(originTmp, 'binary', 'binary', padding);
        start1 += realBit;
        end1 += realBit;
    }

    var encrypted = encoding.convert(result1, 'binary', 'base64');

    return encrypted.toString();
}
/**
 * 公钥解密算法 
* @param cipher
* @param publicKey
* @param maxBit
* @param padding
* @returns {[*]}
* */
function decrypt(cipher, publicKey, maxBit, padding) {
    var start2 = 0;
    var end2 = maxBit;
    var result2 = '';
    var cipherBuff = encoding.convert(cipher, 'base64', 'binary');   //这个地方很关键，直接使用new Buffer(cipher, 'base64') 报编码错误
    var cipherByte = bytes(cipher, 'base64');
    while (start2 < cipherByte) {
        var cipherTmp = cipherBuff.slice(start2, end2);    //请注意slice函数的用法
        result2 += publicKey.publicDecrypt(cipherTmp, 'binary', 'binary', padding); //先保存成二进制，待完成解密后再转换成字符串
        start2 += maxBit;
        end2 += maxBit;
    }

    var decrypted = encoding.convert(result2, 'binary', 'utf8');
    return decrypted.toString();
}