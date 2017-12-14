let fs = require('fs');
let ursa = require('ursa');
let encoding = require('encoding');
let client_private = fs.readFileSync('client_private.key');
let client_public = fs.readFileSync('client_public.pub');

let client = {
    pub :ursa.createPublicKey(client_public),
    pem :ursa.createPrivateKey(client_private)
};


let clientPrivate = client.pem;
let clientPublic = client.pub;
var clientModulusBit = 2048;
var clientMaxBit = clientModulusBit / 8;
var clientRealBit = clientMaxBit - 11;
var padding = ursa.RSA_PKCS10_PADDING;

let data='LOVE';
let signer=ursa.createSigner('sha256');
let verifier=ursa.createVerifier('sha256');


/**
 * ------------------------------------------------------------------
* 加密，使用客户端私钥加密
* @param plain
* @returns {}
* */
exports.priEncrypt = function (plain) {
    plain = plain || "hello world";
    return priencrypt(plain, clientPrivate, clientRealBit, padding);
};


/**
* 解密，使用客户端公钥解密
* @param cipher
* @returns {[*]}
* */
exports.pubDecrypt = function (cipher) {
    cipher = cipher || "";
    return pubdecrypt(cipher, clientPublic, clientMaxBit, padding);
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
function priencrypt(plain, privateKey, realBit, padding) {
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
function pubdecrypt(cipher, publicKey, maxBit, padding) {
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

// * ------------------------------------------------------------------


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


//-------------------------------------------------------------------------
/**
* 使用私钥对文本进行签名
* @param plain
* @returns {[*]}
* */
exports.sign = function(plain){
    signer.update(plain);
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



//----------------------生成csr文件----------------------------------


var s = require('child_process').spawn;
var _ = require('underscore');
var os = require('os');
_.str = require('underscore.string');
_.mixin(_.str.exports());

_.mixin({
	endsWith: function(a, b){
	    var lastIndex = a.lastIndexOf(b);
	    return (lastIndex != -1) && (lastIndex + b.length == a.length);
	},
	contains: function(s, a){
		s = ''+s;
		return s.lastIndexOf(a) != -1;
	},
	log: function(a){
		if(process.env.VERBOSE) console.log('csr-gen: '+a);
	}
});
_.mixin({
	containsAny: function(s, a){
		var result = false;
		_.each(a, function(a){
			if(_.contains(s, a)) result = true; 
		});
		return result;
	}
});

var createSubjectString = function(options) {

	var subj =
		'/C='+options.country+
		'/ST='+options.state+
		'/L='+options.city+
		'/O='+options.company+
		'/OU='+options.division+
		'/CN='+options.domain+
		'/emailAddress='+options.email;
	
	return subj;
};

exports.csrgen = function(domain, options, callback){

	callback || (callback = function(){});

	options || (options = {});
	if(!options.outputDir) options.outputDir = os.tmpdir();
	if(!_.endsWith(options.outputDir, '/')) options.outputDir += '/';
	if(!options.company) options.company = domain;
	if(!options.country) options.country = 'US';
	if(!options.state) options.state = 'California';
	if(!options.city) options.city = 'San Fransisco';
	if(!options.division) options.division = 'Operations';
	if(!options.email) options.email = '';
	if(!options.password) options.password = '';
	if(!options.keyName) options.keyName ='client_private.key';
	if(!options.csrName) options.csrName = domain+'.csr';

	// Needed to generate subject string
	options.domain = domain;

	var keyPath = options.outputDir+options.keyName;
	var csrPath = options.outputDir+options.csrName;

	var read = options.read;
	var destroy = options.destroy;

	var subj = createSubjectString(options);

	_.log("Subj: " + subj);

	var opts = [
		'req',
		'-new',
		'-key', keyPath,
		'-out', csrPath,
		'-subj', subj
	];

	var passFile = options.password != '' ? "pass.txt" : false;

	if (passFile) {
		fs.writeFile(passFile, options.password, function(err) {
			if(err) {
				_.log("Error saving password to temp file: " + err);
			}
		});
		opts.push('-passout');
		opts.push('file:'+passFile);
	} else {
		opts.push('-nodes');
	}

	var openssl = s('openssl', opts);

	function inputText(a){
		_.log('writing: '+a)
		openssl.stdin.write(a+'\n');
	}

	openssl.stdout.on('data', function(a){
		_.log('stdout:'+a);
	});

	openssl.on('exit',function(){
		if(passFile) fs.unlink(passFile);
		_.log('exited');
		if(read){
			fs.readFile(keyPath, {encoding: 'utf8'}, function(err, key){
				if(destroy) fs.unlink(keyPath, function(err){
					if(err) return callback(err);
					readCSR();
				});
				else readCSR();
				function readCSR(){
					fs.readFile(csrPath, {encoding: 'utf8'}, function(err, csr){
						if(destroy) fs.unlink(csrPath, function(err){
							if(err) return callback(err);
							return callback(undefined, { key: key, csr: csr });
						});
						else callback(undefined, { key: key, csr: csr });
					});
				}
			});
		} else callback(undefined, {});
	});

	openssl.stderr.on('data',function(line){
		line = _.trim(line);
		if (line && line != '.' && line != '+' && line != '-----')
			_.log('openssl: ' + line);
	});
};




