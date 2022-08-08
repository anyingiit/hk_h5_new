import React from "react";
import {HomeBase} from "../../../components/doctor/homeBase";
import {useRouter} from "next/router";
import styles from "../../../css/pages/doctor/main/home.module.scss"
import {MessageOutline, TeamOutline} from "antd-mobile-icons";
import {Toast} from "antd-mobile";

const Home: React.FC = () => {
  const router = useRouter()
  return (
    <HomeBase
      activeKey={`home`}
    >
      <div className={styles.container}>
        <div className={styles.box}>
          <div
            className={styles.left}
            onClick={() => {
              Toast.show('协作组')
            }}
          >
            <div className={styles.icon}>
              <TeamOutline/>
            </div>
            <div className={styles.name}>
              <p>协作组</p>
            </div>
          </div>
          <div
            className={styles.right}
            onClick={() => {
              Toast.show('开发中, 敬请期待')
            }}
          >
            <div className={styles.icon}>
              <MessageOutline/>
            </div>
            <div className={styles.name}>
              <p>我的咨询</p>
            </div>
          </div>
        </div>
      </div>
    </HomeBase>
  )
}

export default Home
