import path from "path";
import {AxiosRequestConfig} from "axios";
import {get, post} from "../api";

export const baseUrl: string = path.join(require('../api').baseUrl, '/patient')

export const patientPost = <T = any>(url: string, bodyData: object, bodyDataType: 'x-www-form-urlencoded', options: AxiosRequestConfig = {}) => {
  return post<T>(path.join(baseUrl, url), bodyData, bodyDataType, options)
}

export const patientGet = <T = any>(url: string, params: object, options: AxiosRequestConfig = {}) => {
  return get<T>(path.join(baseUrl, url), params, options)
}
