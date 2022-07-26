import {patientPost} from "./patient";

export const register = (realName: string, telephone: string, password: string, doctorId?: number) => {
  return patientPost('/register', {
    name: realName,
    patient_mobile_phone: telephone,
    password: password,
    doctorId
  }, 'x-www-form-urlencoded')
}
