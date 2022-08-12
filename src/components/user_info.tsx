import React from "react";
import {Avatar, Button} from "antd-mobile";
import styles from "../css/components/user_info.module.scss"

interface Props {
  data: {
    name: string,
    description: string
  },
  bottomButton?: {
    description: string,
    onClick: () => void
  }
}

/**
 * 提供展示用户信息的页面, 包括一个可选的操作按钮
 * @param data 用户姓名, 用户描述
 * @param bottomButton 可选, 当存在时底部存在一个按钮, 你可以设置其按钮文字以及点击回调
 * @constructor
 */
export const User_info: React.FC<Props> = ({data, bottomButton}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Avatar
          src={``}
          style={{
            '--size': '1rem'
          }}
        />
        <p className={styles.name}>{data.name}</p>
        <p className={styles.description}>{data.description}</p>
      </div>
      {
        bottomButton &&
        <div className={styles.bottom}>
          <Button
            color={`primary`}
            onClick={bottomButton.onClick}
          >{bottomButton.description}</Button>
        </div>
      }

    </div>
  )
}

export default User_info
