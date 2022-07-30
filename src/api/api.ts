import {AxiosRequestConfig} from "axios";
import {http} from "../utils";
import qs from "qs"
import {ApiResponse} from "../types";

export const baseUrl: string = '/'

export const post = <T = any>(url: string, bodyData: object, bodyDataType: 'x-www-form-urlencoded', options: AxiosRequestConfig = {}) => {
  return http.request<ApiResponse<T>>(
    {
      ...options,
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/' + bodyDataType
      },
      data: (() => {
        switch (bodyDataType) {
          case "x-www-form-urlencoded":
            return qs.stringify(bodyData)
        }
      })()
    }
  )
}

export const get = <T = any>(url: string, params: object, options: AxiosRequestConfig = {}) => {
  return http.request<ApiResponse<T>>(
    {
      ...options,
      url: url,
      method: 'get',
      params: params
    }
  )
}
