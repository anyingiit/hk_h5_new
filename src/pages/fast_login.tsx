import React, {useState} from "react";
import PageBase from "../components/pageBase";
import styles from "../css/pages/fast_login.module.scss"
import {AutoCenter, Button, Form, Input, Toast} from "antd-mobile";
import {useRouter} from "next/router";
import {doLogin_web_pf} from "../api/login";


interface Query {
  /**
   * 如果存在, 则需要绑定医生
   */
  bindDoctor?: {
    doctorId: number
  }
}

/**
 * Fast_login
 * 页面承载三个作用:
 *    1. 患者登录
 *    2. 患者未注册自动注册并且登录
 *    3. 患者扫描医生二维码注册
 */
const Fast_login: React.FC = () => {
  const router = useRouter()
  const {bindDoctor}: Query = router.query
  const [formData, setFormData] = useState({
    doctorId: ``,
    telephone: ``,
    realName: ``,
    password: ``
  })
  const [mode, setMode] = useState('login' as 'login' | 'register' | 'bindDoctorRegister')
  return (
    <PageBase>
      <div className={styles.root}>
        <div className={styles.container}>
          <Form
            className={styles.form}
            layout={`horizontal`}
            mode={`card`}
            requiredMarkStyle={`text-optional`}
            footer={
              <AutoCenter>
                <div className={styles.button}>
                  <Button type={`submit`} block={true}
                          color={`primary`}>下一步</Button>
                </div>
              </AutoCenter>
            }
            onFinish={
              () => {
                switch (mode) {
                  case "login":
                    doLogin_web_pf(formData.telephone, formData.password)
                      .then((value) => {
                        Toast.show('login 成功了')
                        console.log(value)
                      })
                      .catch((reason) => {
                        // Toast.show('login 失败')
                        //TODO: 是因为用户注册失败, 还是密码错误或者其他失败?  如果是前者, 那么应当跳转到注册页面, 如果是后者, 那么应当提示错误
                        console.log(reason)
                      })
                    break
                  case "register":
                    break
                }
              }
            }
            onFinishFailed={
              () => {
                Toast.show('onFinishFailed')
                console.log(formData)
              }
            }
            onValuesChange={
              (_, allValues) => {
                setFormData(allValues)
              }
            }
          >
            {
              mode === 'bindDoctorRegister' &&
              <>
                <Form.Header>绑定医生编号</Form.Header>
                <Form.Item
                  name={`doctorId`}
                  label={`医生ID`}
                  validateTrigger={`onBlur`}
                  disabled={true}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value === undefined || value.length === 0) {
                          return Promise.resolve()
                        }

                        const test = /^\d*\.?\d+$/
                        if (!test.test(value)) {
                          return Promise.reject(new Error('必须是数字'))
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  <Input placeholder={`请输入医生ID`} type={`number`}/>
                </Form.Item>
              </>
            }
            <Form.Header>未注册用户将被自动注册</Form.Header>
            <Form.Item
              name={`telephone`}
              label={`手机号`}
              validateTrigger={`onBlur`}
              rules={[
                {
                  required: true,
                  message: '手机号不能为空'
                }, {
                  validator: (_, value) => {
                    const test = /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[189])\d{8}$/
                    if (!test.test(value)) {
                      return Promise.reject(new Error('手机号格式非法, 请检查后重试'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input placeholder={`请输入手机号`} type={`number`}/>
            </Form.Item>
            <Form.Header>需要填写基本信息和密码(6-20位)</Form.Header>
            {
              (mode === `register` || mode === `bindDoctorRegister`) &&
              <Form.Item
                name={`realName`}
                label={`姓名`}
                validateTrigger={`onBlur`}
                rules={[
                  {
                    required: true,
                    message: '姓名不能为空'
                  }, {
                    validator: (_, value) => {
                      const test = /^[\u4e00-\u9fa5·]{2,16}$/

                      if (!test.test(value)) {
                        return Promise.reject(new Error('姓名非法, 请检查后重试'))
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
              >
                <Input placeholder={`请输入真实姓名`}/>
              </Form.Item>
            }
            <Form.Item
              name={`password`}
              label={`密码`}
              validateTrigger={`onBlur`}
              rules={[
                {
                  required: true,
                  message: '密码不能为空'
                }, {
                  validator: (_, value) => {
                    const test = /[A-Z\d]{6,20}/

                    if (!test.test(value)) {
                      return Promise.reject(new Error('密码不符合要求, 请检查后重试'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input placeholder={`请输入密码`}/>
            </Form.Item>
          </Form>
        </div>
      </div>
    </PageBase>
  )
}

export default Fast_login
