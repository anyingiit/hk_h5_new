import {patientHttp} from "./patient";

interface PatientLoginRequest {
  mobile: string,
  pd: string
}

export const patientRegister = (telephone: string, password: string) => {
  //TODO: 警告, 请求实际上早就被执行了, 所以这里面的参数根本没有传达到位
  return patientHttp({
    url: '/register',
    data: {
      mobile: telephone,
      pd: password
    } as PatientLoginRequest,
    method: 'POST'
  })
}
