import React from "react";
import {BottomNavBar} from "./bottomNavBar";
import PageBase from "./pageBase";
import {
  AppOutline,
  MessageFill,
  MessageOutline,
  UnorderedListOutline,
  UserOutline
} from "antd-mobile-icons";
import {Badge} from "antd-mobile";
import {useRouter} from "next/router";
import path from "path";

interface Props {
  children: React.ReactNode,
  activeKey: 'home' | 'todo' | 'message' | 'personalCenter'
}

export const HomeBase: React.FC<Props> = ({children, activeKey}) => {
  const router = useRouter()
  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline/>,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '我的待办',
      icon: <UnorderedListOutline/>,
      badge: '5',
    },
    {
      key: 'message',
      title: '我的消息',
      icon: (active: boolean) =>
        active ? <MessageFill/> : <MessageOutline/>,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '个人中心',
      icon: <UserOutline/>,
    },
  ]

  return (
    <PageBase style={{
      position: 'relative',
      width: '100vw',
      height: '100vh'
    }}>
      {children}
      <BottomNavBar
        style={{
          position: 'absolute',
          width: '100vw',
          bottom: '0',
          left: '0'
        }}
        tabs={tabs}
        activeKey={activeKey}
        onChange={(key) => {
          router.push(path.join('/main', key))
        }}
      />
    </PageBase>
  )
}
