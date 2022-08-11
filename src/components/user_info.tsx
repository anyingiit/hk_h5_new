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
