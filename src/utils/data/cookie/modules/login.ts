import {cookie} from "../cookie";

/**
 * 用于存储用户信息
 * @param object 存在用户信息
 * @param undefined 不存在用户登录信息
 */
type User = {
  /**
   * 用户token
   */
  token: string
} | undefined

const hasLoginInfo = (): boolean => {
  return cookie.get('user') !== undefined
}

const writeLoginInfo = (token: string) => {
  cookie.set('user', {
    token: token
  } as User)
}

const removeLoginInfo = () => {
  cookie.remove('user')
}

const getLoginInfo = (): User | undefined => {
  return cookie.get('user')
}

// 如果想要使用者导入时是别名导入, 那么就需要使用default
export {hasLoginInfo, writeLoginInfo, removeLoginInfo, getLoginInfo}
