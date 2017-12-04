let pri_pub =require('./crypto/pri-pub');
let pub_pri =require('./crypto/pub-pri');

let plain='LOVE';
let encrypts=pri_pub.priEncrypt(plain);
let decrypts=pri_pub.pubDecrypt(encrypts);
let encrypt=pub_pri.pubEncrypt(plain);
let decrypt=pub_pri.priDecrypt(encrypt);
console.log(encrypts);
console.log(decrypts);
console.log(encrypt);
console.log(decrypt);