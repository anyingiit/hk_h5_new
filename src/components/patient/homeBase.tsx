import React from "react";
import PageBase from "../pageBase";
import {Toast} from "antd-mobile";
import {useRouter} from "next/router";
import path from "path";
import NewBottomNavBar from "../newBottomNavBar";
import {ContentOutline, UserOutline} from "antd-mobile-icons";

interface Props {
  children: React.ReactNode,
  activeKey: 'home' | 'todo' | 'message' | 'personalCenter',
  style?: React.CSSProperties
}

export const HomeBase: React.FC<Props> = ({children, activeKey, style}) => {
  const router = useRouter()

  return (
    <PageBase
      allScreen={true}
      style={{
        paddingBottom: '0.49rem',
        ...style
      }}>
      {children}
      <NewBottomNavBar
        item={{
          left: {
            title: '医嘱',
            onClick: () => {
              Toast.show('开发中, 敬请期待')
            },
            icon: <ContentOutline/>
          },
          center: {
            onClick: () => {
              router.push(path.join('/patient', '/main', '/home'))
            }
          },
          right: {
            title: '我的',
            onClick: () => {
              Toast.show('开发中, 敬请期待')
            },
            icon: <UserOutline/>
          },
        }}
        curSelect={((): 'left' | 'center' | 'right' => {
          switch (activeKey) {
            case "home":
              return 'center'
            case "personalCenter":
              return 'right'
            default:
              return 'center'
          }
        })()
        } style={{
        position: 'absolute',
        width: '100vw',
        bottom: '0',
        left: '0'
      }}/>
    </PageBase>
  )
}
