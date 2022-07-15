import React, {useState} from "react";
import {patientRegister} from "../api";
import {AxiosError} from "axios";
import {Button, Form, Input, Steps, Toast} from "antd-mobile";
import {useRouter} from "next/router";

const {Step} = Steps

interface Query {
  /**
   * 用户是否已经完成基本账号信息的注册, 如果已完成那么直接将注册阶段跳到`主要信息`阶段
   */
  isCompleteAccountRegister?: boolean,
  /**
   * 用户如果在其他对方输入过手机号(例如登录页), 那么可以传入该参数, 免得用户再次输入
   */
  telephone?: string
}

// TODO: props应当能够接受一个参数, 标识用户已经完成了账号注册, 但是需要继续进行必要信息的填写
// TODO: props应当能接受一个手机号, 该手机号的作用就是用户在登录界面输入了手机号, 然后点击了注册, 此时将该手机号直接输入到该页面手机号框内, 免得用户重复输入手机号
/**
 * 用户注册页面
 * 用户注册共计三个阶段
 *    1. 账号信息
 *    2. 主要信息
 *    3. 其他信息
 */
const Register: React.FC<any> = () => {
  const router = useRouter()
  const {isCompleteAccountRegister, telephone: queryTelephone}: Query = router.query
  console.log(isCompleteAccountRegister)
  console.log(queryTelephone)

  //TODO: 如果用户因为账号过期退出登录, 那么默认值可以是cookie中用户的手机号
  //TODO: 应当将第一页注册表单单独抽象为一个页面, 其中telephone, password, conformPassword由该页面维护
  const [telephone, setTelephone] = useState(queryTelephone ?? '')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')

  //TODO: 到底是使用路由切换页面, 还是只用render刷新不同的组件?
  const [curStep, setCurStep] = useState(0)
  const clickNextStep = () => {
    switch (curStep) {
      case 0:
        // TODO: 基本账号注册完成后应当提示`您已完成账号注册, 请继续完成信息填写!`
        // TODO: 如果用户填写的账号和密码经过后台效验是有效的, 并且该用户出于未完成必填信息阶段, 那么将可以进行下一步

        // TODO: 密码输入是否一致判断
        // TODO: 手机号是否合法判断
        if (password !== conformPassword) {
          Toast.show('两次输入手机号不一致 ' + telephone + ' ' + conformPassword)
          return
        }
        patientRegister(telephone, password)
          //TODO: 应当在http.ts加入判断, 如果code 不等于2000那么应当抛出错误, 以便这里的catch可以接收
          .then((resp) => {
            Toast.show('基本账号注册成功')
            setCurStep(curStep + 1)
          })
          .catch((error: AxiosError) => {
            Toast.show('请求失败: ' + error)
            console.log(error)
          })
        break
      case 1:
        setCurStep(curStep + 1)
        break
      case 2:
        break
    }
  }
  const register = () => {
    patientRegister("18888888892", "123456")
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
      <Steps current={curStep}>
        <Step title={`账号`}/>
        <Step title={`主要信息`}/>
        <Step title={`其他信息`} description={`选填`}/>
      </Steps>
      <Form
        layout={`horizontal`}
        footer={
          <Button color={`primary`} block={true} type={`submit`}
                  fill={`outline`}>{curStep < 2 ? '下一步' : '提交'}</Button>
        }
        onFinish={clickNextStep}
        onFinishFailed={() => {
          Toast.show('onFinishFailed')
        }}
      >
        <Form.Item
          name={`telephone`}
          label={`手机号`}
          rules={[{required: true, message: '手机号不能为空'}]}
          initialValue={telephone}
        >
          <Input onChange={val => setTelephone(val)} placeholder={`请输入手机号`}/>
        </Form.Item>
        <Form.Item
          name={`password`}
          label={`密码`}
          rules={[{required: true, message: '密码不能为空'}]}
        >
          <Input onChange={val => setPassword(val)} placeholder={`请输入密码`} clearable={true} type={`password`}/>
        </Form.Item>
        <Form.Item
          name={`conformPassword`}
          label={`确认密码`}
          rules={[{required: true, message: '确认密码不能为空'}]}
        >
          <Input onChange={val => setConformPassword(val)} placeholder={`请再次输入密码`} clearable={true} type={`password`}/>
        </Form.Item>
      </Form>

    </div>
  )
}

export default Register
