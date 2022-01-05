'use strict';
const download = require('./index');

(async function () {
  // let target = 'https://valipl.cp31.ott.cibntv.net/69766128FD93F71AF54BA3347/03000900005FBB675CDDF956ECC37EBCA100AC-5E0D-4973-A5EA-696D9B9DB386.m3u8?ccode=0502&duration=31&expire=18000&psid=88ccb5b8fd2de8b9f187eacfb374907a43346&ups_client_netip=3af612e2&ups_ts=1641350726&ups_userid=&utid=tQzYGVKoyH8CATr2EuJJc5vH&vid=XNDk3NjUyMTg1Mg&vkey=B2906ab85b5ccebc12382768363cea216&sm=1&operate_type=1&dre=u37&si=73&eo=0&dst=1&iv=0&s=&type=mp4hd3v3&bc=2&t=f30015f5910a099&cug=1&rid=20000000CA6E79B664AED5FF7EC16111A5CD585B02000000';


  let target='https://apd-a3f81ff63432030f46a06614fdb6b814.v.smtcdns.com/omts.tc.qq.com/ANlUPJ9H51t0nqmjZjpT-is1DXJHilkCc6DEugGCyyNI/uwMROfz2r57IIaQXGdGnC2dXOm7hjGQsChse-qVxwu7rgi-F/svp_50069/Wv-CUToQnoWt0hIzlZ9ZRVkyKG2MHp9auhZXF7dwf89vvzaMnEt8Ev4ZnZydIEymuFbFc396gsg6dJlxe5SlMkBXS4qB5EQoMKoygN_kIp17tT1v72K91Id3YnpoxLoKHoiZhlGcWF04DcGiAxj8j1AIWfMMvFUKyinzrfB4DvXsbIfS9maQ-A/gzc_1000035_0b534uariaabpqaai4gmrzqzjzodctsqcfca.f304110.ts.m3u8?ver=4&v_idx=0&ctime=2022-01-05 11:40:15';
  let client = new download(
    target,
    false,
    true,
    false,
    'test.mp4');
  await client.download();
})();





