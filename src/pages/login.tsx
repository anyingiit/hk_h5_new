import React, {useState} from "react";
import {AutoCenter, Button, Form, Grid, Input, Toast} from "antd-mobile";
import {useRouter} from "next/router";
import styles from "../css/pages/login.module.scss"
import {patientLogin} from "../api/v1/api/patient/login";

// TODO: 应当抽象公共逻辑, 使得该页面患者和医生登录都共用一个页面
const Login: React.FC<any> = () => {
  const router = useRouter()
  //TODO: 如果用户因为账号过期退出登录, 那么默认值可以是cookie中用户的手机号
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')

  const clickLogin = () => {
    patientLogin(telephone, password)
      .then((resp) => {
        const data = resp.data.data
        if (data.loginFlag === undefined || typeof data.loginFlag !== 'number') {
          Toast.show('内部错误')
          console.log('未获取到字段`loginFlag`, 或者字段格式错误')
          return
        }
        /**
         * 0 信息未完善, 需要跳转到信息完善页面继续注册
         * 1 信息完善, 可以继续业务逻辑
         */
        const loginFlag = data.loginFlag as number
        if (loginFlag === 0) {
          Toast.show('您的账号正确, 请继续注册, 完善必填信息')
          router.push({
            pathname: '/register',
            query: {
              isCompleteAccountRegister: true
              //TODO: 应当把Token传过去
            }
          })
          return
        }

        // TODO: 登录正常, 应当将用户信息存入cookie
        // TODO: 还没有测试'登录成功'逻辑是否能够正确执行
        Toast.show('登录成功, 你好' + data.name)
      })
  }
  const clickRegister = () => {
    router.push({
      pathname: '/register',
      query: (
        () => {
          // 数据不为空时, 才会在query中添加这个键值对
          const data: {[key: string]: string} = {}
          if (telephone !== "") {
            data['telephone'] = telephone
          }
          return data
        }
      )()
    })
  }
  const clickRetrieve = () => {
    Toast.show({
      content: '请联系管理员处理',
      maskClickable: false,
      position: 'bottom'
    })
  }
  return (
    <div>
      <AutoCenter><h2>患者登录</h2></AutoCenter>
      <Form
        layout={`horizontal`}
        requiredMarkStyle='text-optional'
        className={styles.form}
        onFinish={clickLogin}
        onFinishFailed={() => {
          Toast.show('onFinishFailed')
        }}
        footer={
          <Button
            type={`submit`}
            className={styles.loginButton}
            block={true}
            size={`large`}
            color={`primary`}
          >登录
          </Button>
        }
      >
        <Form.Item
          name={`telephone`}
          label={`手机号`}
          rules={[{required: true, message: '手机号不能为空'}]}
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
      </Form>
      {/*<AutoCenter>*/}
      {/*  <Button */}
      {/*    color={`primary`} */}
      {/*    onClick={() => {*/}
      {/*    router.push('/register')*/}
      {/*  }}>登录*/}
      {/*  </Button>*/}
      {/*</AutoCenter>*/}
      {/*TODO: 将Button移至From的字段属性的footer中, 以便可以使用其检测表单是否合法的特性*/}
      <Grid columns={2}>
        <Grid.Item>
          <AutoCenter>
            <Button
              fill={`outline`}
              color={`primary`}
              onClick={clickRegister}
            >立即注册
            </Button>
          </AutoCenter>
        </Grid.Item>
        <Grid.Item>
          <AutoCenter>
            <Button
              fill={`outline`}
              color={`primary`}
              onClick={clickRetrieve}
            >找回密码
            </Button>
          </AutoCenter>
        </Grid.Item>
      </Grid>
      <div>
      </div>
    </div>
  )
}


export default Login
