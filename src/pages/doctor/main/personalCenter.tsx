import {Avatar, List, Toast} from "antd-mobile";
import React from "react";
import {HomeBase} from "../../../components/doctor/homeBase";
import styles from "../../../css/pages/doctor/main/personalCenter.module.scss"
import {GetServerSideProps} from "next";

interface Props {
  userInfo: {
    id: number,
    name: string,
    description: string
  }
}

const PersonalCenter: React.FC<Props> = ({userInfo}) => {
  return (
    <HomeBase activeKey={`personalCenter`}>
      <div className={styles.container}>
        <List>
          <List.Item
            key={userInfo.name}
            prefix={
              <Avatar src={``}/>
            }
            description={userInfo.description}
            onClick={() => {
              Toast.show('详情')
            }}
          >
            {userInfo.name}
          </List.Item>
        </List>
        <div
          className={styles.myQrCode}
          onClick={() => {
            Toast.show('我的二维码')
          }}
        >
          我的二维码
        </div>
      </div>
    </HomeBase>
  )
}

export default PersonalCenter


export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  return {
    props: {
      userInfo: {
        id: 1,
        name: '何医生',
        description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
      }
    }
  }
}
