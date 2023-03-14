/** 用户必有数据 */
interface IUserData {
  /** 用户`id` */
  id: number;
  /** 账号 */
  account: string;
  /** 密码 */
  password: string;
  /** 用户名 */
  name: string;
  /** 用户类型 */
  type: number;
  /** 用户分组`id` */
  groupId: number;
}

export {
    IUserData,
}