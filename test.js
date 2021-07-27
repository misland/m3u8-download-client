const download = require('./index');

// m3u8文件中url不完整
let client = new download('222',
  'https://apd-efe7721cc90c5d225f6c5248371a6c58.v.smtcdns.com/omts.tc.qq.com/AOuvIp8ucBrJsCNI07u9ClgmEZFAKjLICgUl8_cp9ORs/uwMROfz2r5zIIaQXGdGnC2df645AHpR-pVjI5hvW8Wk822MC/dT_ZjXy6-zkrzNHhNoHTTiUE3UIfML_SsEA37_lIo9itKxb5M4YMJ8uYZ4Yk2W8u2tp0ec1FIxdhJ2Zk-dPGNXp15g-D17kXWuSWfSO-2cXM5dsBuPKTdQH9ckEuNIfW67e3EkUfHj1eNu36veLHP75MD4spo2l8lNkwhZhKOCpS9aqJrsVmEw/',
  true,
  false);

// m3u8文件中有完整url
let client2 = new download('111', '', true, false);

(async function () {
  await client.download();
})();