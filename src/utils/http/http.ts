import axios, {Axios, AxiosError, AxiosPromise, AxiosRequestConfig} from "axios";
import {getLoginInfo} from "../data";

const getBaseUrl = (env: string) => {
  const base: { [propName: string]: string } = {
    "production": '/',
    "development": 'http://testapi.51cgt.cn/',
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
  request = (options: AxiosRequestConfig): AxiosPromise => {
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
      config.headers = {
        // TODO: 从cookie获取token
        ...config.headers,
        "Content-Type": 'multipart/form-data;',
        "x-hk-token": getLoginInfo()?.token ?? '',
      }
      return config
    }, (error: AxiosError) => Promise.reject(error))

    /**
     * 设置响应拦截器
     */
    instance.interceptors.response.use((response) => {
      // TODO: 对请求结果进行预处理
      return response
    }, (error: AxiosError) => {
      /**
       * 当有返回时
       */
      if (error.response) {
        switch (error.response.status) {
          // TODO: 响应错误码处理
          case 403:
            break
          case 404:
            // console.log('404了')
            break
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
