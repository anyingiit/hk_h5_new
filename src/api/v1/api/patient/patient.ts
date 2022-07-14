import {AxiosRequestConfig} from "axios";
import {http} from "../../../../utils";

export const url = require("../api").url + '/patient'

export const patientHttp = (options: AxiosRequestConfig) => {
  return http.request(
    {
      ...options,
      url: url + options.url,
      headers: {
        "x-hk-client": "patient"
      }
    }
  )
}
