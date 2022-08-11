import React from "react";
import PageBase from "../../../../../components/pageBase";
import styles
  from "../../../../../css/pages/doctor/main/home/send_message.module.scss"
import {Button, Space} from "antd-mobile";

export const Send_message: React.FC = () => {
  return (
    <PageBase
      allScreen={false}
      navBar={{
        title: '何医生',
        showBackArrow: true
      }}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.messageBox}></div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.buttons}>
            <Space align={`center`}>
              <button>患者病历</button>
              <button>视频通话</button>
              <button>会诊结果</button>
              <button>结束会诊</button>
            </Space>
          </div>
          {/*TODO: 文本框和按钮会将父盒子挤压的的问题*/}
          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <input className={styles.input}></input>
            </div>
            <div className={styles.right}>
              <Button block={true}>发送</Button>
            </div>
          </div>
        </div>
      </div>
    </PageBase>
  )
}

export default Send_message
