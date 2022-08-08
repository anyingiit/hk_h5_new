import React from "react";
import {GetServerSideProps} from "next";
import PageBase from "../../../../../components/pageBase";
import styles
  from "../../../../../css/pages/patient/main/home/fast_match/doctor_detail.module.scss"
import {Avatar, Button} from "antd-mobile";

interface Props {
  id: number,
  name: string,
  description: string
}

export const Doctor_detail: React.FC<Props> = ({id, name, description}) => {
  return (
    <PageBase
      allScreen={true}
      navBar={{
        title: '签约医生',
        showBackArrow: true
      }}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <Avatar
            src={``}
            style={{
              '--size': '1rem'
            }}
          />
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.bottom}>
          <Button color={`primary`}>签约</Button>
        </div>
      </div>
    </PageBase>
  )
}
export default Doctor_detail

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  return {
    props: {
      id: 1,
      name: '何医生',
      description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
    }
  }
}
