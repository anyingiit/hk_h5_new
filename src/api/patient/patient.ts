import path from "path";
import {AxiosRequestConfig} from "axios";
import {get, post} from "../api";

export const baseUrl: string = path.join(require('../api').baseUrl, '/patient')

export const patientPost = (url: string, bodyData: object, bodyDataType: 'x-www-form-urlencoded', options: AxiosRequestConfig = {}) => {
  return post(path.join(baseUrl, url), bodyData, bodyDataType, options)
}

export const patientGet = (url: string, params: object, options: AxiosRequestConfig = {}) => {
  return get(path.join(baseUrl, url), params, options)
}
