import React, {useState} from "react";
import PageBase from "../../../../../../components/pageBase";
import styles
  from "../../../../../../css/pages/doctor/main/home/cooperative_group/add_member/index.module.scss"
import {Avatar, Empty, List, SearchBar} from "antd-mobile";
import path from "path";
import {useRouter} from "next/router";


interface DoctorInfo {
  id: number,
  name: string,
  description: string
}

export const Index: React.FC = () => {
  const router = useRouter()
  const [searchResult, setSearchResult] = useState<DoctorInfo | undefined>(undefined)
  return (
    <PageBase
      allScreen={false}
      navBar={{
        title: '添加协作组成员',
        showBackArrow: true
      }}
    >
      <div className={styles.container}>
        <SearchBar
          showCancelButton={true}
          placeholder={`通过手机号查找医生`}
          onSearch={(val) => {
            setSearchResult((() => {
              if (val === '18888888888') {
                return {
                  id: 1,
                  name: '何医生',
                  description: '广东省英德市人民医院中医科何文星医生，中医世家，医学硕士'
                } as DoctorInfo
              }
            })())
          }}
          onClear={() => {
            setSearchResult(undefined)
          }}
        />
        {
          searchResult === undefined
            ? <Empty/>
            : (
              <List>
                <List.Item
                  key={searchResult.id}
                  prefix={
                    <Avatar src=''/>
                  }
                  description={searchResult.description}
                  onClick={() => {
                    router.push({
                      pathname: path.join(router.pathname, '/doctor_detail'),
                      query: {
                        id: searchResult.id
                      }
                    })
                  }}
                >
                  {searchResult.name}
                </List.Item>
              </List>
            )
        }
      </div>
    </PageBase>
  )
}

export default Index
