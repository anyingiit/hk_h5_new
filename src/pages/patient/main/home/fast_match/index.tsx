import React from "react";
import PageBase from "../../../../../components/pageBase";
import {Avatar, List} from "antd-mobile";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import path from "path";

interface DoctorInfo {
  id: number,
  name: string,
  description: string
}

interface Props {
  matchedDoctor: DoctorInfo,
  allDoctor: DoctorInfo[]
}

export const Index: React.FC<Props> = ({matchedDoctor, allDoctor}) => {
  const router = useRouter()
  return (
    <PageBase
      allScreen={false}
      navBar={{
        title: '快速匹配',
        showBackArrow: true
      }}
    >
      <List header='已匹配医生'>
        <List.Item
          key={matchedDoctor.name}
          prefix={
            <Avatar src=''/>
          }
          description={matchedDoctor.description}
        >
          {matchedDoctor.name}
        </List.Item>
      </List>
      <List header='全部医生'>
        {allDoctor.map(user => (
          <List.Item
            key={user.name}
            prefix={
              <Avatar src=''/>
            }
            description={user.description}
            onClick={() => {
              router.push({
                pathname: path.join(router.pathname, '/doctor_detail'),
                query: {
                  //TODO: 传参
                }
              })
            }}
          >
            {user.name}
          </List.Item>
        ))}
      </List>
    </PageBase>
  )
}

export default Index


export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  return {
    props: {
      matchedDoctor: {
        id: 1,
        name: '何医生',
        description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
      },
      allDoctor: [
        {
          id: 1,
          name: '何医生',
          description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
        },
        {
          id: 1,
          name: '何医生',
          description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
        },
        {
          id: 1,
          name: '何医生',
          description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
        },
        {
          id: 1,
          name: '何医生',
          description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
        },
      ]
    }
  }
}
