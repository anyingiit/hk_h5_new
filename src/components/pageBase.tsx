import React from "react";
import {NavBar, SafeArea} from "antd-mobile";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../css/components/pageBase.module.scss"

interface Props {
  navBar?: {
    title: string,
    showBackArrow: boolean
  },
  children?: React.ReactNode,
  style?: React.CSSProperties,
  /**
   * 如果启用`全屏模式`, 那么如果传过来的子元素高度超过屏幕高度, 则将会被隐藏掉
   */
  allScreen: boolean,
}

/**
 * 页面的基础模板, 包括:
 *    1. viewport的设置
 *    2. 可配置的navBar
 *    3. 上下安全区
 */
const PageBase: React.FC<Props> = ({navBar, children, style, allScreen}) => {
  //TODO: 增加遮罩
  const router = useRouter()
  return (
    <div className={styles.root} style={{
      position: 'fixed',
      width: '3.75rem',
      height: '100%',
      ...(() => {
        /**
         * 因为使用了fixed, 并且navBar的位置是绝对位置, 所以navBar不会计算高度了
         * 使用paddingTop为nav预留一定的位置
         * 只有当启用navBar时才会生效
         */
        if (navBar) {
          return {
            paddingTop: '0.45rem',
          }
        }
      })(),
      boxSizing: 'border-box',
      ...style
    }}>
      <Head>
        <meta name={`viewport`}
              content={`width=device-width, initial-scale=1.0, viewport-fit=cover`}/>
        {/*TODO: 如果不启用navBar, 那么页面title永远是`页面, 应当给与选项, 能在不启用`navBar`的时候也能更改页面title*/}
        <title>{navBar ? navBar.title : `页面`}</title>
      </Head>

      <div style={{background: '#ace0ff'}}>
        <SafeArea position='top'/>
      </div>

      {/* navBar */}
      {
        navBar &&
        <NavBar
          backArrow={navBar.showBackArrow}
          onBack={
            () => {
              router.back()
            }
          }
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        >{navBar.title}</NavBar>
      }

      {/* children */}
      {
        <div style={{
          height: '100%',
          ...(() => {
            /**
             * 如果启用非全屏模式, 那么则启用滚动条, 模拟非全屏
             */
            if (!allScreen) {
              return {
                overflow: 'scroll'
              }
            }
          })()
        }}>
          {children}
        </div>
      }

      <div style={{background: '#ffcfac'}}>
        <SafeArea position='bottom'/>
      </div>
    </div>
  )
}

export default PageBase
