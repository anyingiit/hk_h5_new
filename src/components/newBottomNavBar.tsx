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

/**
 * 用户页面底部Nav操作条, 内含有三个按钮, 分别是左侧按钮, 中间主要按钮, 右侧按钮
 * @param item 左中右按钮的按钮图标, 描述, 以及回调, 其中居中按钮没有描述或者图片选项, 其为固定样式
 * @param curSelect 用于指定哪个按钮属于选中状态
 * @param style 向最外侧container直接添加style
 * @constructor
 */
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
