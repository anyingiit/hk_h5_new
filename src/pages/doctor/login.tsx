import React, {useState} from "react";
import {Button, Form, Input, Toast} from "antd-mobile";
import {useRouter} from "next/router";
import PageBase from "../../components/pageBase";
import styles from "../../css/pages/doctor/login.module.scss"

const Login: React.FC<any> = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    telephone: '',
    password: ''
  })

  const clickLogin = () => {
    Toast.show('提交')
  }
  return (
    <PageBase allScreen={true}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>医生登录</h2>
        </div>
        <Form
          className={styles.form}
          layout={`horizontal`}
          requiredMarkStyle='text-optional'
          onFinish={clickLogin}
          onFinishFailed={() => {
            Toast.show('onFinishFailed')
          }}
          footer={
            <Button
              type={`submit`}
              block={true}
              size={`large`}
              color={`primary`}
            >登录
            </Button>
          }
          onValuesChange={(changedValues, allValues) => {
            setForm({
              ...form,
              ...changedValues
            })
          }}
        >
          <Form.Item
            name={`telephone`}
            label={`手机号`}
            rules={[{required: true, message: '手机号不能为空'}]}
          >
            <Input placeholder={`请输入手机号`}/>
          </Form.Item>
          <Form.Item
            name={`password`}
            label={`密码`}
            rules={[{required: true, message: '密码不能为空'}]}
          >
            <Input placeholder={`请输入密码`} clearable={true}
                   type={`password`}/>
          </Form.Item>
        </Form>
        <div>
        </div>
      </div>
    </PageBase>
  )
}


export default Login
