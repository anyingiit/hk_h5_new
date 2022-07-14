import React from "react";
import {AxiosError} from "axios";
import {patientRegister} from "../api";

const Login: React.FC<any> = () => {
  const register = () => {
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
      <button onClick={register}>注册</button>
    </div>
  )
}


export default Login
