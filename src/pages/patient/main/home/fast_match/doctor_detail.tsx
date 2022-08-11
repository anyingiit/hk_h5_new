import React from "react";
import {GetServerSideProps} from "next";
import PageBase from "../../../../../components/pageBase";
import styles
  from "../../../../../css/pages/patient/main/home/fast_match/doctor_detail.module.scss"
import {Avatar, Button} from "antd-mobile";
import {isNumber, toNumber} from "../../../../../utils";


interface Query {
  id?: string
}

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
  const dataBase = [
    {
      id: 1,
      name: '何医生',
      description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
    },
    {
      id: 2,
      name: '王医生',
      description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
    },
    {
      id: 3,
      name: '刘医生',
      description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
    },
    {
      id: 4,
      name: '薛医生',
      description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
    },
  ]

  const {id}: Query = context.query


  let props = (() => {
    if (id === undefined || !isNumber(id)) {
      return dataBase[0]
    }
    const idNumber = toNumber(id)

    return dataBase.find((item) => {
      if (item.id === idNumber) {
        return true
      }
    }) ?? dataBase[0]
  })()
  return {
    props: {
      ...props
    }
  }
}
