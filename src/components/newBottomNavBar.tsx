import React from "react";
import styles from "../css/components/newBottomNavBar.module.scss"
import {AppstoreOutline} from "antd-mobile-icons";

interface Props {
  item: {
    left: {
      title: string,
      onClick: () => void,
      icon: React.ReactNode
    },
    center: {
      onClick: () => void
    },
    right: {
      title: string,
      onClick: () => void,
      icon: React.ReactNode
    }
  }
  // itemOnClick: {
  //   left: () => void,
  //   center: () => void,
  //   right: () => void
  // },
  curSelect: 'left' | 'center' | 'right',
  style: React.CSSProperties
}

export const NewBottomNavBar: React.FC<Props> = ({
                                                   item,
                                                   curSelect,
                                                   style
                                                 }) => {
  return (
    <div className={styles.container} style={style}>
      <div className={[styles.item, styles.left].join(' ')}
           onClick={item.left.onClick}
           style={{
             ...(() => {
               if (curSelect === 'left') {
                 return {
                   color: 'var(--adm-color-primary)'
                 }
               }
             })()
           }}
      >
        <div className={styles.icon}>
          {item.left.icon}
        </div>
        <span className={styles.words}>{item.left.title}</span>
      </div>
      <div className={[styles.item, styles.center].join(' ')}
           onClick={item.center.onClick}
           style={{
             ...(() => {
               if (curSelect === 'center') {
                 return {
                   color: 'var(--adm-color-primary)'
                 }
               }
             })()
           }}
      >
        <div className={styles.round}>
          <AppstoreOutline/>
        </div>
      </div>
      <div className={[styles.item, styles.right].join(' ')}
           onClick={item.right.onClick}
           style={{
             ...(() => {
               if (curSelect === 'right') {
                 return {
                   color: 'var(--adm-color-primary)'
                 }
               }
             })()
           }}
      >
        <div className={styles.icon}>
          {item.right.icon}
        </div>
        <span className={styles.words}>{item.right.title}</span>
      </div>
    </div>
  )
}

export default NewBottomNavBar
