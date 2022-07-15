import React, {useState} from "react";
import {AutoCenter, Button, Form, Grid, Input, Toast} from "antd-mobile";
import {useRouter} from "next/router";
import styles from "../css/pages/login.module.scss"

// TODO: 应当抽象公共逻辑, 使得该页面患者和医生登录都共用一个页面
const Login: React.FC<any> = () => {
  const router = useRouter()
  //TODO: 如果用户因为账号过期退出登录, 那么默认值可以是cookie中用户的手机号
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')

  const clickLogin = () => {

  }
  const clickRegister = () => {
    router.push({
      pathname: '/register',
      query: {
        telephone: telephone
      }
    })
  }
  const clickRetrieve = () => {
    Toast.show({
      content: '敬请期待!',
      maskClickable: false,
      position: 'bottom'
    })
  }
  return (
    <div>
      <AutoCenter><h2>患者登录</h2></AutoCenter>
      <Form layout={`horizontal`} requiredMarkStyle='text-optional' className={styles.form}>
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
      <Button
        className={styles.loginButton}
        block={true}
        size={`large`}
        color={`primary`}
        onClick={clickLogin}
      >登录
      </Button>
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
