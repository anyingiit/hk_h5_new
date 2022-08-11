import React, {useState} from "react";
import PageBase from "../../../../../components/pageBase";
import {Avatar, Button, Empty, List, SearchBar, Toast} from "antd-mobile";
import {GetServerSideProps} from "next";
import pinyin from "pinyin";
import styles
  from "../../../../../css/pages/doctor/main/home/cooperative_group/index.module.scss"
import {useRouter} from "next/router";
import path from "path";

interface DoctorInfo {
  id: number,
  name: string,
  description: string
}

interface Props {
  data: DoctorInfo[]
}

export const Index: React.FC<Props> = ({data}) => {
  const router = useRouter()
  const [searchResult, setSearchResult] = useState<DoctorInfo[]>(data)
  return (
    <PageBase
      allScreen={false}
      navBar={{
        title: '协作组',
        showBackArrow: true
      }}
    >
      <div className={styles.container}>
        <SearchBar
          showCancelButton={true}
          placeholder={`搜索已经添加完医生`}
          onSearch={(val) => {
            setSearchResult((() => {
              return data.filter((doctorInfo) => {
                // debugger
                if (doctorInfo.name.match(val) !== null) {
                  return true
                }

                // debugger
                const pinyinStr = pinyin(doctorInfo.name, {
                  style: 'normal'
                }).join('')
                if (pinyinStr.match(val) !== null) {
                  return true
                }
              })
            })())
          }}
          onClear={() => {
            setSearchResult(data)
          }}
        />
        {
          searchResult.length === 0
            ? <Empty/>
            : <List>
              {searchResult.map(user => (
                <List.Item
                  key={user.id}
                  prefix={
                    <Avatar src=''/>
                  }
                  description={user.description}
                  onClick={() => {
                    //TODO: 可以复用
                    Toast.show('id: ' + user.id)
                  }}
                >
                  {user.name}
                </List.Item>
              ))}
            </List>
        }
        <div className={styles.bottom}>
          <Button
            block={true}
            color={`default`}
            size={`large`}
            onClick={() => {
              router.push(path.join(router.pathname, '/add_member'))
            }}
          >
            添加协作组成员
          </Button>
        </div>
      </div>
    </PageBase>
  )
}

export default Index


export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: Props }> => {
  return {
    props: {
      data: [
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
