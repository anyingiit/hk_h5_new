import React, {ReactNode} from "react";
import {Badge, TabBar} from "antd-mobile";

interface Props {
  style?: React.CSSProperties,
  activeKey: string,
  onChange: (key: string) => void,
  tabs: {
    key: string,
    title: ReactNode,
    icon: ReactNode | ((active: boolean) => ReactNode),
    badge?: React.ReactNode | typeof Badge.dot
  }[]
}

export const BottomNavBar: React.FC<Props> = ({
                                                style,
                                                tabs,
                                                activeKey,
                                                onChange
                                              }) => {
  return (
    <TabBar activeKey={activeKey} onChange={onChange} style={style}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
      ))}
    </TabBar>
  )
}
