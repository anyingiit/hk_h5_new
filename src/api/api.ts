import {AxiosRequestConfig} from "axios";
import {http} from "../utils";
import qs from "qs"

export const baseUrl: string = '/'

export const post = (url: string, bodyData: object, bodyDataType: 'x-www-form-urlencoded', options: AxiosRequestConfig = {}) => {
  return http.request(
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

export const get = (url: string, params: object, options: AxiosRequestConfig = {}) => {
  return http.request(
    {
      ...options,
      url: url,
      method: 'get',
      params: params
    }
  )
}
