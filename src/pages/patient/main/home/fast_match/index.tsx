import React, {useState} from "react";
import PageBase from "../../../../../components/pageBase";
import {Avatar, List, SearchBar} from "antd-mobile";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import path from "path";
import {SearchOutline} from "antd-mobile-icons";
import styles
  from "../../../../../css/pages/patient/main/home/fast_match/index.module.scss"
import pinyin from "pinyin";

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
  const [search, setSearch] = useState({
    enable: false,
    data: [] as DoctorInfo[]
  })
  return (
    <PageBase
      allScreen={false}
      navBar={{
        title: '快速匹配',
        showBackArrow: true,
        right: (
          <div
            style={{
              fontSize: '0.24rem'
            }}
          >
            <SearchOutline onClick={() => {
              setSearch({
                ...search,
                enable: !search.enable,
                data: allDoctor
              })
            }}/>
          </div>
        )
      }}
    >
      <div className={styles.container}>
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
              key={user.id}
              prefix={
                <Avatar src=''/>
              }
              description={user.description}
              onClick={() => {
                router.push({
                  pathname: path.join(router.pathname, '/doctor_detail'),
                  query: {
                    id: user.id
                  }
                })
              }}
            >
              {user.name}
            </List.Item>
          ))}
        </List>

        {/*SearchPage*/}
        <div
          className={styles.searchPage}
          hidden={!search.enable}
        >
          <SearchBar placeholder='搜索全部医生'
                     showCancelButton={() => true}
                     onCancel={() => {
                       setSearch({
                         ...search,
                         enable: false
                       })
                     }}
                     onSearch={(val) => {
                       setSearch({
                         ...search,
                         data: allDoctor.filter((doctorInfo) => {
                           if (doctorInfo.name.indexOf(val) > 0) {
                             return true
                           }

                           // debugger
                           const pinyinStr = pinyin(doctorInfo.name, {
                             style: 'normal'
                           }).join('')
                           if (pinyinStr.match(val) != null) {
                             return true
                           }
                         })
                       })
                     }}
          />
          <List header='搜索结果'>
            {search.data.map(user => (
              <List.Item
                key={user.id}
                prefix={
                  <Avatar src=''/>
                }
                description={user.description}
                onClick={() => {
                  //TODO: 可以复用
                  router.push({
                    pathname: path.join(router.pathname, '/doctor_detail'),
                    query: {
                      id: user.id
                    }
                  })
                }}
              >
                {user.name}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
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
    }
  }
}
