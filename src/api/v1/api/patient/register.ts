import {patientHttp} from "./patient";

//TODO: 应当对请求数据进行规范
interface PatientLoginRequest {
  mobile: string,
  pd: string
}

export const patientRegister = (telephone: string, password: string) => {
  //TODO: 应当data传入JSON格式, 然后在某处自动将其转换为FormData对象并将data替换
  let formData = new FormData()
  formData.append('mobile', telephone)
  formData.append('pd', password)
  return patientHttp({
    url: '/register',
    data: formData,
    method: 'POST',
  })
}
