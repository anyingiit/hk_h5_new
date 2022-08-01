import React from "react";
import {HomeBase} from "../../components/homeBase";
import styles from "../../css/pages/main/home.module.scss"

const Home: React.FC = () => {
  return (
    <HomeBase
      activeKey={`home`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className={styles.round}>
        <div className={styles.box}>
          {/*术后随访*/}
          <div className={styles.a}></div>
          {/*健康档案*/}
          <div className={styles.b}></div>
          {/*正念康养*/}
          <div className={styles.c}></div>
          {/*我的咨询*/}
          <div className={styles.d}></div>
          {/*快速匹配*/}
          <div className={styles.e}></div>
          {/*食药营养*/}
          <div className={styles.f}></div>
        </div>
      </div>
    </HomeBase>
  )
}

export default Home
