import * as Koa from "koa";
// import * as koaBody from "koa-body";
const { koaBody } = require("koa-body");
import * as staticFiles from "koa-static";
import * as path from "path";
import utils from "./utils";
import { IContext } from "./types/base";
import router from "./routes/index";
import config from "./modules/config";
const App = new Koa();
import { query } from "./utils/mysql";
App.use(staticFiles(path.resolve(__dirname, "../public/**")));

App.use(async (ctx: IContext, next) => {
  console.count("request count");

  const { origin, referer } = ctx.headers;
  const domain = utils.getDomain(referer || "");
  // 如果是 允许访问的域名源 ，则给它设置跨域访问和正常的请求头配置
  // TODO 添加域名白名单
  if (domain) {
    ctx.set({
      "Access-Control-Allow-Origin": domain,
      // "Access-Control-Allow-Origin": "*", // 开启跨域，一般用于调试环境，正式环境设置指定 ip 或者指定域名
      // "Content-Type": "application/json",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      // "X-Powered-By": "3.2.1",
      // "Content-Security-Policy": `script-src "self"` // 只允许页面`script`引入自身域名的地址
    });
  }
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message,
    };
  }
});

// 使用中间件处理 post 传参 和上传图片
App.use(
  koaBody({
    multipart: true,
    // formidable: {
    //   maxFileSize: config.uploadImgSize,
    // },
  })
);

// 开始使用路由
App.use(router.routes());

App.on("error", (err, ctx) => {
  console.log(`\x1B[91m server error !!!!!!!!!!!!! \x1B[0m`, err, ctx);
});

App.listen(config.port, async () => {
  // for (let i = 0; i < 100; i++) {
  //     console.log(`\x1B[${i}m 颜色 \x1B[0m`, i);
  // }
  console.log(" 服务器启动完成:");
  console.log(
    ` - Local:   \x1B[36m http://localhost:\x1B[0m\x1B[96m${config.port} \x1B[0m`
  );
  console.log(
    ` - Network: \x1B[36m http://${config.ip}:\x1B[0m\x1B[96m${config.port} \x1B[0m`
  );
  const res = await query("select * from user_table");
  console.log("res", res);
});
