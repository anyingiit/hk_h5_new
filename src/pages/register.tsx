import React from "react";
import {AxiosError} from "axios";
import {patientRegister} from "../api";

const Register: React.FC<any> = () => {
  const login = () => {
    patientRegister("18888888889", "123456")
      .then((resp) => {
        console.log(resp.data)
        console.log(resp)
      })
      .catch((error: AxiosError) => {
        console.log(error)
      })
  }
  return (
    <div>
      <button onClick={login}>登录</button>
    </div>
  )
}


export default Register
