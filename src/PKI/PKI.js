/**
* 导入依赖
*/
let fs = require('fs');
let ursa = require('ursa');

const modulusBit = 512;
var key = ursa.generatePrivateKey(modulusBit, 65537);
let client = generation(key);


/**
* 生成私钥,写入到文件中 client_private.pem
* 生成公钥,写入到文件中 client_public.pub
* @param key
* @returns {[*]}
* */
function generation(key) {
    var privatePem = ursa.createPrivateKey(key.toPrivatePem());
    var privateKey = privatePem.toPrivatePem('utf8');

    fs.writeFile('client_private.pem', privateKey, 'utf8', function (error) {
        if (error) {
            throw error;
        }
        console.log('\n私钥privateKey已经保存\n');
        console.log('\n私钥privateKey：\n' + privateKey);
    });
    //生成公钥
    var publicPem = ursa.createPublicKey(key.toPublicPem());
    var publicKey = publicPem.toPublicPem('utf8');

    fs.writeFile('client_public.pub', publicKey, 'utf8', function (error) {
        if (error) {
            throw error;
        }
        console.log('\n公钥publicKey已经保存\n');
        console.log('\n公钥publicKey：\n' + publicKey);
    });
    let client = {
        pub: publicKey,
        pem: privateKey
    };
    return client;
}
exports.client=client