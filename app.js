// let pri_pub =require('./crypto/pri-pub');
// let pub_pri =require('./crypto/pub-pri');
// let sign_verify=require('./crypto/sign');

// let plain='LOVE';
// let encrypts=pri_pub.priEncrypt(plain);
// let decrypts=pri_pub.pubDecrypt(encrypts);
// let encrypt=pub_pri.pubEncrypt(plain);
// let decrypt=pub_pri.priDecrypt(encrypt);

// let sign=sign_verify.sign(plain);
// let verify=sign_verify.verify(plain,sign);

let sdk=require('./src/sdk/sdk');
// let base=require('./src/base64/base64');
// let PKI=require('./PKI/PKI');
// PKI.PKI();
let plain='LOVE';
let encrypts=sdk.priEncrypt(plain);
let decrypts=sdk.pubDecrypt(encrypts);
let encrypt=sdk.pubEncrypt(plain);
let decrypt=sdk.priDecrypt(encrypt);

let sign=sdk.sign(plain);
let verify=sdk.verify(plain,sign);


console.log('********************');
console.log('---私钥加密公钥解密---');
console.log('加密结果--',encrypts);
let signbase64 = new Buffer(encrypts);
let signBase64=signbase64.toString('base64');
console.log('加密结果BASE64--',signBase64);
console.log('解密结果--',decrypts);
console.log('********************');
console.log('---公钥加密私钥解密---');
console.log('加密结果--',encrypt);
console.log('解密结果--',decrypt);
console.log('-------------------');
console.log('********************');
console.log('---私钥签名公钥验证---');
console.log('签名结果--',sign);
console.log('验证结果--',verify);
console.log('-------------------');
console.log('********************');

var domain = 'baidu.com';

sdk.csrgen(domain, {
	outputDir: __dirname,
	read: true,
	country:'CN',
	company: 'Example, Inc.',
	email: 'joe@foobar.com'
}, function (err, keys) {
	console.log('CSR created!')
	console.log('key: ' + keys.private);
	console.log('csr: ' + keys.csr);

	let csrbase64 = new Buffer(encrypts);
	let csrBase64=csrbase64.toString('base64');
	console.log('P10文件BASE64--',csrBase64);
});