import {loginPost} from "./login";

export const doLogin_web_pf = (telephone: string, password: string) => {
  return loginPost('/doLogin_web_pf', {
    mobile_phone: telephone,
    password: password
  }, 'x-www-form-urlencoded')
}
