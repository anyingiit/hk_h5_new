import {patientPost} from "./patient";

export const register = (realName: string, telephone: string, password: string, doctorId?: number) => {
  return patientPost<Data>('/register', {
    name: realName,
    patient_mobile_phone: telephone,
    password: password,
    doctorId
  }, 'x-www-form-urlencoded')
}

export interface Data {
  patientId: number;
  hisPatientId?: any;
  patientName: string;
  spellCode: string;
  departmentId?: any;
  credentialType: string;
  credentialTypeNumber: string;
  gender: string;
  age?: any;
  birthday: number;
  birthdayS?: any;
  birthplace: string;
  address: string;
  nationality: string;
  citizenship: string;
  province: string;
  county: string;
  photo: string;
  marriage: string;
  mobilePhone: string;
  homePhone: string;
  homeAddress: string;
  contact: string;
  contactPhone: string;
  homePostcode: string;
  email: string;
  introduction: string;
  education: string;
  household: string;
  occupation: string;
  orgnization: string;
  orgnizationAddress: string;
  insuranceType: string;
  insuranceNumber: string;
  bloodtype?: any;
  lastmodifiedDatetime?: any;
  createdDatetime: number;
  pinyin?: any;
  wechatCode?: any;
  weChatInfoBean?: any;
  uuid: string;
  imInfoBean?: any;
  userId: number;
}
