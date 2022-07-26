import path from "path";
import {AxiosRequestConfig} from "axios";
import {get, post} from "../api";

export const baseUrl: string = path.join(require('../api').baseUrl, '/login')


export const loginPost = (url: string, bodyData: object, bodyDataType: 'x-www-form-urlencoded', options: AxiosRequestConfig = {}) => {
  return post(path.join(baseUrl, url), bodyData, bodyDataType, options)
}

export const loginGet = (url: string, params: object, options: AxiosRequestConfig = {}) => {
  return get(path.join(baseUrl, url), params, options)
}
