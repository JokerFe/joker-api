import * as Koa from "koa";
import * as koaBody from "koa-body";
import * as staticFiles from "koa-static";
import * as path from "path";

import { TheContext } from "./types/base";

const App = new Koa();

App.use(async (ctx: TheContext, next) => {