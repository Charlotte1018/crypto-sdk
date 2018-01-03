let prams = {
    "app_id": "A18BBC85D0A75FF7",
    "api_type": 21,
    "sign": "be4efa32983ba89da181bf43520c07e7ea666390af22b2a2d413511fedb632ee",
    "name": "时昌雪",
    "id_num": "410725199310181664",
    "organization": "北京枫玉科技",
    "department": "技术部",
    "province": "北京市",
    "city": "北京市",
    "email": "925290164@qq.com",
    "phone": "18811715625",
    "p10": `-----BEGIN CERTIFICATE REQUEST-----
                      MIICrjCCAZgCAQAwOzE5MAkGA1UEBhMCUlUwLAYDVQQDDCVTaW1wbGUgdGVzdCAo
                      0L/RgNC+0YHRgtC+0Lkg0YLQtdGB0YIpMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A
                      MIIBCgKCAQEA1yYshn+5BzU7rSez7zyuRJyITBEDUQzKv/iTOlHl9UPvHA1K86Wh
                      jHUXF/FijUskU11QNebl0zWCzFhCCPkd7IYIxTSblNpJ+GwtikPFsBs6j+tCmHUu
                      k5Nal4wGXX2DIqC7cCJ5x6T0Vvqv4AoQUkQ2WsJ8cqq6wXPhKCgxF7ICym6DWMxR
                      oNZ4Rr4tmsDEOEvPa+xcvx1MQ4mK6ShvsWEYm4hzITShxI+JWhWg3NL9r/bDktpw
                      2Lty5N3AxfaQ0x+YBUvoQh9n1ssRpa+R2hLgEXeHzsBwi5tRcUJGa4M58wJzc5ZU
                      Aj1DRIixCu070Xya4JKIOHA8H9dDdHwWGwIDAQABoDAwLgYJKoZIhvcNAQkOMSEw
                      HzAdBgNVHQ4EFgQU6qKd0XSkKLm7rUDqEYov3rMxxrowCwYJKoZIhvcNAQELA4IB
                      AQASMOmMtb0b6phOQ8dr7cWdXUyhxuAVxaQSUkIzI4zZyRP6qHaSUn/IC2fQv7re
                      g+QygwbhSLYO86iMKL3+mKjWZUn0GWbhxEiRwQOrUUyrw0rEDGbr/vGKwjGk/uuo
                      lfJb0On5XUhvdoLFa0pIL+qq9lHwWc2olBTu8/Omz/AzRvI2QAezIpjKh1sgpQxY
                      S/Fwz/pXw3rhUatRffrb+VfQiLaMFkGalbdTyo1baMkCVdQzG57bUkgDsIHQFeL+
                      lsasLhXTFt8qpdAurSQ8N8oQOnTklbSlHYpCYhB1QcZa+XV60zwj1V1bfwwSMrli
                      n46yvbE0OWtLzX9M3YgNbmLk
                      -----END CERTIFICATE REQUEST-----`,
    "time": "1514957627",
    "sequence_num": "123456789",
    "test_str": "1234567890123456",
    "signed_str": "cc6a609b163ead37e83a72732bb75d6900b93a7974bcbcd10747f6368e5d648a6a4a11ad165b1eef2cdd24fc770b5afa3ba3ea4bfd6604d597674ac9de841aed86c4a0bd53a30582a6906f60a1fb684e8c840a8dd25556a756656e33eeca8b54f69b892e584eb5184cd97e19cd3204837940a7a8781d77ed1a0f4059ee274c90e669c44500dccd34dc8b0c882950f2b019405aec0df19522f59d483fd560b0646e457cd34022bcc2be4dfbd73d20beda9d5b51845a1e7444119daef621fb10fec45942a017140bf74242f23de3138fd137afa561bd8642130d16c1b26a7630475d34e0832c71f4ddd1a8b0d64005ae386fa549c4c5213e0d703a2b95ab8f61c6",
    "eid_user": "eID MIC2",
    "eid_issuser_sn": "021013",
    "eid_sn": "6C0C000000034E62ABB3D3A3",
    "data_to_sign": "MjAxODAxMDMxMTQ0MzQ6aGVsbG86MQ==",
    "eid_signed": "PyeIpCjWZlXB9Z5mb+DK2hsm9bK0tCUeMIMMHLGY+jcybSN9ZW1bi2aXx4g97Est3oVwiyUKR3D2Koyyboa/kElIaoj+34/X2EVyQ/t0oNckeyGNuz62oBN1AMSjS8S3C8CH3GA1cg2T1nqNKEmtLwngvL/yMMxpbRlQfHddBBI="
}
let init = {
    method: 'POST',
    body: JSON.stringify(prams),
    mode: 'cors',
    cache: 'default'
};
let url = 'https://bate.51zbb.net/partner/interface';
fetch(url,init).then(res => {
    console.log(res);
})