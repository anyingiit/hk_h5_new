import React from "react";
import {GetServerSideProps} from "next";
import PageBase from "../../../../../components/pageBase";
import {isNumber, toNumber} from "../../../../../utils";
import User_info from "../../../../../components/user_info";
import {Toast} from "antd-mobile";


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
      <User_info
        data={{name, description}}
        bottomButton={{
          description: '签约',
          onClick: () => {
            Toast.show(id.toString())
          }
        }}/>
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
