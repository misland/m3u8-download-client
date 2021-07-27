const fs = require('fs');
const https = require('https');
const readline = require('readline');
const url = require('url');
const childProcess = require('child_process');
const os = require('os');

class Download {
  #files = null;
  #downloaded = null;
  constructor(file, prefix, hasParam, deleteTemFile, output) {
    // 要下载的m3u8文件
    this.target = file;
    // 有的m3u8文件中只有文件列表，如某1，这时需要拼接完整url
    this.prefix = prefix;
    // m3u8文件中的url中是否含有参数，如某酷
    this.hasParam = hasParam;
    // 是否删除下载过程中的缓存文件
    this.deleteTemFile = deleteTemFile;
    // 最后保存的mp4文件名称
    this.output = output;
    // m3u8列表中的文件
    this.#files = [];
    // 已下载的文件列表
    this.#downloaded = [];
  }

  async getFiles(file) {
    let tem = [];
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(file)) {
        resolve([]);
        file = null;
      }
      const rl = readline.createInterface({
        input: fs.createReadStream(file)
      });

      rl.on('line', (data) => {
        if (!data.startsWith('#')) {
          tem.push(data);
        }
      });

      rl.on('close', () => {
        resolve(tem);
        file = null;
      });

    });
  };

  async download_slice(durl, dest) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      let options = url.parse(durl);
      https.get(options, function (response) {
        response.pipe(file);
      });
      file.on('finish', () => {
        file.close();
        console.log(`${durl} download completely`);
        resolve();
      })
        .on('error', (err) => {
          fs.unlinkSync(file);
          console.error(`download ${durl} failed,error:${err.message}`);
          reject();
        });
    });
  };

  async download() {
    try {
      // 检查目标文件夹是否存在
      if (!fs.existsSync(`./${this.target}`)) {
        console.log(`create ${this.target} folder`);
        fs.mkdirSync(`./${this.target}`);
      }
      // 已经下载的片断
      this.#downloaded = await this.getFiles(`./${this.target}/downloaded.txt`);
      // 待下载文件列表
      this.#files = await this.getFiles(`./${this.target}.m3u8`);
      // 存放已经下载的片断，符合ffmpeg合并时所需格式
      let ffmpeg_file = fs.openSync(`./${this.target}/files.txt`, 'a+');
      // 存放已经下载的片断url
      let download_file = fs.openSync(`./${this.target}/downloaded.txt`, 'a+');
      for (let data of this.#files) {
        // 还没下载继续下载
        if (this.#downloaded.indexOf(data) < 0) {
          console.log(`begin to download ${data}`);
          let tem_file = null;
          if (this.hasParam) {
            tem_file = data.split('?')[0];
            tem_file = tem_file.substr(tem_file.lastIndexOf('/') + 1);
          }
          else {
            tem_file = data.substr(data.lastIndexOf('/') + 1);
          }
          console.log(`destination:${this.target}/${tem_file}`);
          await this.download_slice(`${this.prefix}${data}`, `./${this.target}/${tem_file}`);
          fs.writeFileSync(ffmpeg_file, `file ${tem_file}\r\n`);
          fs.writeFileSync(download_file, `${data}\r\n`);
        }
      }
      fs.closeSync(ffmpeg_file);
      fs.closeSync(download_file);

      // 拼接片断
      childProcess.execSync(`ffmpeg -v error -f concat -i ./${this.target}/files.txt -vcodec copy -acodec copy ./${this.output}.mp4 -y`);

      // 删除缓存文件
      if (this.deleteTemFile) {
        if (os.platform() === 'win32') {
          childProcess.execSync(`rmdir /Q /S ${this.target}`);
        }
        else if (os.platform() === 'linux') {
          childProcess.execSync(`rm -rf ${this.target}`);
        }
        else {
          // todo
          console.log('not suported platform');
        }
      }
      console.log('file download successfully');
    }
    catch (err) {
      console.error(err);
    }
  }
}

module.exports = Download;
