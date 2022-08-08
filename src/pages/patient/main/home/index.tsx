import React from "react";
import {HomeBase} from "../../../../components/patient/homeBase";
import styles from "../../../../css/pages/patient/main/home/home.module.scss"
import {Toast} from "antd-mobile";
import {useRouter} from "next/router";
import path from "path";

const Index: React.FC = () => {
  const router = useRouter()
  return (
    <HomeBase
      activeKey={`home`}
    >
      <div className={styles.container}>
        <div className={styles.round}>
          <div className={styles.box}>
            {/*术后随访*/}
            <div
              className={styles.a}
              onClick={() => {
                Toast.show('开发中, 敬请期待!')
              }}
            ></div>
            {/*健康档案*/}
            <div
              className={styles.b}
              onClick={() => {
                Toast.show('开发中, 敬请期待!')
              }}
            ></div>
            {/*正念康养*/}
            <div
              className={styles.c}
              onClick={() => {
                Toast.show('开发中, 敬请期待!')
              }}
            ></div>
            {/*我的咨询*/}
            <div
              className={styles.d}
              onClick={() => {
                Toast.show('开发中, 敬请期待!')
              }}
            ></div>
            {/*快速匹配*/}
            <div
              className={styles.e}
              onClick={() => {
                router.push(path.join(router.pathname, '/fast_match'))
              }}
            ></div>
            {/*食药营养*/}
            <div
              className={styles.f}
              onClick={() => {
                Toast.show('开发中, 敬请期待!')
              }}></div>
          </div>
        </div>
      </div>
    </HomeBase>
  )
}

export default Index
