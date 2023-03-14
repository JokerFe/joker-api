import * as Koa from "koa";
import { IUserData } from "./user";

export interface IContext extends Koa.ParameterizedContext {
  /**
   * 请求时自定义设置的一个`token`信息
   */
  theToken?: IUserData;
}

/** 基础对象 */
export interface BaseObj<T = string | number> {
  [key: string]: T;
}

/** 接口响应数据，返回给前端用 */
export interface ApiResult<T = any> {
  /** 状态提示 */
  message: string;
  /** 状态码 */
  code: number;
  /** 返回数据 */
  result: T;
}

/** JavaScript类型 */
export type JavaScriptTypes =
  | "string"
  | "number"
  | "array"
  | "object"
  | "function"
  | "null"
  | "undefined"
  | "regexp";
