# 重复造轮子
其实用ffmpeg根据m3u8文件可以直接下载，不过有的m3u8文件中没有完整url😑，这时如果要用ffmpeg进行下载，就比较麻烦了，需要手动编辑m3u8文件将所有片断的url补足，这是万万不能接受的，麻烦！！！

# 前提条件
## 已安装nodejs
## 已安装ffmpeg并正确配置环境变量

# 优势
运行时只依赖nodejs，没有任何第三方库，没有node_modules黑洞😃

# 用法
先在浏览器中找到m3u8文件url，如下图
![m3u8](./mouxun.jpg)
右键复制完整url<br>
引入index文件，构造客户端实例，调用`download`下载即可，下载成功后，当前文件夹下会有参数指定的mp4文件<br>
构造函数目前接收五个参数，具体释义如下：
+ file：要下载的m3u8文件完整链接url
+ hasPrefix：有的m3u8文件url中只有ts文件名称（如某1），没有前缀url，此参数用于设置前缀url，若m3u8中包含完整的url，传递空字符串''
+ hasParam：有的m3u8文件中的url包含参数（如某酷），将些参数设置为true，可以正确解析ts片断文件名
+ deleteTemFile：文件下载成功后，是否删除中间文件
+ output：最终输出的mp4文件名，如保存为tem.mp4

以某迅视频为例（某讯的m3u8链接是包含在一个完整的url中的，需要自己动手解析出来🤨）
```
let target='https://apd-a3f81ff63432030f46a06614fdb6b814.v.smtcdns.com/omts.tc.qq.com/ANlUPJ9H51t0nqmjZjpT-is1DXJHilkCc6DEugGCyyNI/uwMROfz2r57IIaQXGdGnC2dXOm7hjGQsChse-qVxwu7rgi-F/svp_50069/Wv-CUToQnoWt0hIzlZ9ZRVkyKG2MHp9auhZXF7dwf89vvzaMnEt8Ev4ZnZydIEymuFbFc396gsg6dJlxe5SlMkBXS4qB5EQoMKoygN_kIp17tT1v72K91Id3YnpoxLoKHoiZhlGcWF04DcGiAxj8j1AIWfMMvFUKyinzrfB4DvXsbIfS9maQ-A/gzc_1000035_0b534uariaabpqaai4gmrzqzjzodctsqcfca.f304110.ts.m3u8?ver=4&v_idx=0&ctime=2022-01-05 11:40:15';
  let client = new download(
    target,
    false,
    true,
    false,
    'test.mp4');
  await client.download();
```
以某酷为例<br>
```
let target = 'https://valipl.cp31.ott.cibntv.net/69766128FD93F71AF54BA3347/03000900005FBB675CDDF956ECC37EBCA100AC-5E0D-4973-A5EA-696D9B9DB386.m3u8?ccode=0502&duration=31&expire=18000&psid=88ccb5b8fd2de8b9f187eacfb374907a43346&ups_client_netip=3af612e2&ups_ts=1641350726&ups_userid=&utid=tQzYGVKoyH8CATr2EuJJc5vH&vid=XNDk3NjUyMTg1Mg&vkey=B2906ab85b5ccebc12382768363cea216&sm=1&operate_type=1&dre=u37&si=73&eo=0&dst=1&iv=0&s=&type=mp4hd3v3&bc=2&t=f30015f5910a099&cug=1&rid=20000000CA6E79B664AED5FF7EC16111A5CD585B02000000';
let client = new download(
  target,
  true,
  true,
  false,
  'test.mp4');
await client.download();
```

# 免责声明
此代码仅用于测试和分享，使用者请注意视频提供者版权问题，若使用此library进行非法操作侵犯他人权益，则使用者负全部责任，本人不负任何责任