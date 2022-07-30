import React, {useState} from "react";
import PageBase from "../components/pageBase";
import styles from "../css/pages/fast_login.module.scss"
import {AutoCenter, Button, Form, Input, Toast} from "antd-mobile";
import {doLogin_web_pf} from "../api/login";
import {GetServerSideProps} from "next";
import {register} from "../api/patient/register";
import {isNumber, toNumber} from "../utils";
import {useRouter} from "next/router";


interface Query {
  /**
   * 如果存在, 则需要绑定医生
   */
  doctorId?: string
}

interface Props {
  /**
   * 如果存在, 则需要绑定医生
   */
  doctorId?: number
}

/**
 * Fast_login
 * 页面承载三个作用:
 *    1. 患者登录
 *    2. 患者未注册自动注册并且登录
 *    3. 患者扫描医生二维码注册
 */
const Fast_login: React.FC<Props> = ({doctorId}) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    doctorId: doctorId,
    telephone: ``,
    realName: ``,
    password: ``
  })
  // debugger
  const [mode, setMode] = useState(formData.doctorId ? 'bindDoctorRegister' : 'login' as 'login' | 'register' | 'bindDoctorRegister')
  //TODO: 使用useEffect页面载入时需不需要进入`bindDoctorRegister`模式并且将`doctorId`注册到`form.doctorId`
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
                          color={`primary`}>{mode === 'login' ? '登录' : '注册'}</Button>
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
                        router.push('/home')
                        console.log(value)
                      })
                      .catch((reason) => {
                        // Toast.show('login 失败')
                        if (reason.data === undefined) {
                          return
                        }
                        const respData = reason.data
                        /**
                         * 如果失败的原因是该用户未注册, 那么应当跳转到注册页面
                         */
                        if (respData.operateCode === 4009) {
                          Toast.show('请继续填写剩余内容以完成注册')
                          setMode('register')
                        }
                        //TODO: 是因为用户注册失败, 还是密码错误或者其他失败?  如果是前者, 那么应当跳转到注册页面, 如果是后者, 那么应当提示错误
                        console.log(reason)
                      })
                    break
                  case "register":
                    register(formData.realName, formData.telephone, formData.password)
                      .then(() => {
                        Toast.show('注册成功!')
                        router.push('http://baidu.com')
                      })
                      .catch((reason) => {
                        Toast.show('注册失败...')
                        console.log(reason)
                      })
                    break
                  case "bindDoctorRegister":
                    register(formData.realName, formData.telephone, formData.password, formData.doctorId)
                      .then(() => {
                        Toast.show('注册成功!')
                        router.push('http://baidu.com')
                      })
                      .catch((reason) => {
                        Toast.show('注册失败...')
                        console.log(reason)
                      })
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
                  initialValue={formData.doctorId}
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


export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  const {doctorId}: Query = context.query
  let props: Props = {}
  if (doctorId && isNumber(doctorId)) {
    props.doctorId = toNumber(doctorId)
  }
  return {
    props: {
      ...props
    }
  }
}
