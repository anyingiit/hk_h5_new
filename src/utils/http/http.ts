import axios, {
  Axios,
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig
} from "axios";
import {Toast} from "antd-mobile";
import {ToastHandler} from "antd-mobile/es/components/toast";

const getBaseUrl = (env: string) => {
  const base: { [propName: string]: string } = {
    // TODO: 将其替换为生产服务器地址
    "production": 'https://testapi.51cgt.cn/DPPlatform',
    "development": 'http://testapi.51cgt.cn/DPPlatform',
    "test": 'http://localhost:3001',
  }
  return base[env] ?? base['production']
}

class MyAxios {
  readonly baseUrl: string
  readonly timeout: number
  /**
   * 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
   * 也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
   */
  readonly withCredentials: boolean

  loadToast: ToastHandler | null = null

  constructor() {
    this.baseUrl = getBaseUrl(process.env.NODE_ENV)
    this.timeout = 10000
    this.withCredentials = true
  }

  /**
   * 创建并返回一个包含请求预设选项, 以及自定义请求选项的Axios实例
   * @param options 自定义选项
   * @return AxiosPromise
   */
  request = <T = any>(options: AxiosRequestConfig): AxiosPromise<T> => {
    /**
     * 每次请求都创建一个新的实例
     */
    const instance = axios.create()
    const config: AxiosRequestConfig = {
      ...options,
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials
    }
    this.setInterceptors(instance, config.url)

    return instance(config)
  }

  // TODO: 在请求拦截器中加入loading, 在返回拦截器中取消loading
  /**
   * 对Axios实例设置拦截器
   * @param instance Axios实例
   * @param url request url, 可以针对需要特殊处理的接口设置不同的拦截器
   */
  setInterceptors = (instance: Axios, url: string | undefined) => {
    /**
     * 设置请求拦截器
     */
    instance.interceptors.request.use((config) => {
      // 发送请求之前显示一个loading 的 Toast, 其返回一个控制器, 控制器可以调用`close`方法.
      // 接受其返回值到成员变量`loadToast`中, 在请求有结果时调用`close`方法

      this.loadToast = Toast.show({
        icon: `loading`,
        duration: 0,
        content: `处理中...`
      })
      config.headers = {
        // TODO: 从cookie获取token
        ...config.headers,
      }
      return config
    }, (error: AxiosError) => Promise.reject(error))

    /**
     * 设置响应拦截器
     */
    instance.interceptors.response.use((response) => {
      // TODO: 对请求结果进行预处理
      this.loadToast != null && this.loadToast.close()

      // 返回的结果根本没有数据
      if (!response.data) {
        Toast.show('response中没有数据')
        return Promise.reject(response)
      }
      const respData = response.data
      // 返回的结果不包含success或者message
      if (respData.success === undefined || respData.msg === undefined || respData.operateCode === undefined) {
        Toast.show('response数据中缺少success, msg, operateCode三个字段中的一个字段')
        return Promise.reject(response)
      }
      if (!respData.success) {
        // Array<{...}> 和 {...}[]的写法是一样的
        /**
         * 记录需要特殊处理的url, 已经对于这个url来说, 哪些后端返回的消息是需要特殊处理的
         */
        const specialHandling: Array<{
          url: string,
          targets: Array<{
            /**
             * 操作状态码
             */
            operateCode: number,
            /**
             * 当服务器返回的消息和这里记录的消息完全匹配(完全一致)的话, 就执行这个函数. 当该函数为`undefined`时代表什么都不需要执行
             */
            handling: (() => void) | undefined
          }>
        }> = [
          {
            url: '/login/doLogin_web_pf',
            targets: [
              /**
               * 用户尝试登录时发现该用户不存在
               */
              {
                operateCode: 4009,
                handling: undefined
              }
            ]
          }
        ]
        /**
         * 遍历需要特殊处理的对象
         */
        for (const specialItem of specialHandling) {
          /**
           * 当实际请求url和记录url一致时
           */
          if (url === specialItem.url) {
            /**
             * 判断服务器返回的消息是否和匹配的一致
             */
            for (const target of specialItem.targets) {
              /**
               * 如果一致则需要执行该函数(undefined则不需要执行)
               */
              if (respData.operateCode === target.operateCode) {
                target.handling != undefined && target.handling()
                /**
                 * 执行成功则直接返回, 这里屏蔽了后续操作
                 * 场景举例: 当未注册用户尝试使用注册登录综合页面进行登录的时候, 服务器会返回`该用户未注册`等相关信息, 这个时候如果将该消息返回给用户是不妥的, 因为这是预期内的错误, 此时应当什么都不提示, 应当在请求回调用进行相关操作并且提示正确信息(例如: 先将页面切换为注册页面(为啥不直接注册, 因为注册用户还有其他相关信息需要填写)), 然后提示`请继续填写表单以完成注册)
                 */
                return Promise.reject(response)
              }
            }
          }
        }
        /**
         * 当上方匹配成功后, 下方代码的操作都被屏蔽了
         */
        Toast.show('统一出错, 接口返回操作失败了, 信息: ' + respData.msg)
        return Promise.reject(response)
      }
      return response
    }, (error: AxiosError) => {
      this.loadToast != null && this.loadToast.close()
      /**
       * 当有返回时
       */
      if (error.response) {
        switch (error.response.status) {
          // TODO: 响应错误码处理
          case 403:
            Toast.show('403了, 请联系管理员处理')
            break
          case 404:
            Toast.show('接口未找到, 请联系管理员处理')
            break
          default:
            Toast.show(`出错了, status${error.response.status} 请联系管理员处理!`)
        }
        return Promise.reject(error.response)
      }

      /**
       * 断网处理
       */
      if (!window.navigator.onLine) {
        // TODO: 跳转到断提示页
        return -1;
      }

      /**
       * 其他情况直接将error返回
       */
      return Promise.reject(error)
    })
  }

}


export default new MyAxios()
