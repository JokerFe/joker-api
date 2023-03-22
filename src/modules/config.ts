import * as os from "os";

// 获取本机IP地址
function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key] || [];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return "";
}

class Config {
  constructor() {
    this.ip = getIPAdress();
  }
  // ip
  readonly ip: string;
  /** 服务器公网`ip` */
  readonly publicIp = "39.106.16.187";

  /** 是否开发模式 */
  get isDev() {
    return this.ip !== this.publicIp;
  }

  // 端口号
  readonly port: number = this.isDev ? 4000 : 8081;

  // 接口前缀
  readonly apiPrefix: string = "";


  /** 数据库配置 */
  readonly db = {
    host: "39.106.16.187",
    user: "root",
    password: "joker1993",
    /** 数据库名 */
    database: "user",
    /** 链接上限次数 */
    maxLimit: 10
  }
}

export default new Config();
