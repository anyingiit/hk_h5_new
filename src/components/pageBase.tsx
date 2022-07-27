import React from "react";
import {NavBar} from "antd-mobile";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../css/components/pageBase.module.scss"

interface Props {
  navBar?: {
    title: string,
    showBackArrow: boolean
  },
  children?: React.ReactNode
}

/**
 * 页面的基础模板, 包括:
 *    1. viewport的设置
 *    2. 可配置的navBar
 *    3. 上下安全区
 */
const PageBase: React.FC<Props> = ({navBar, children}) => {
  //TODO: 增加遮罩
  const router = useRouter()
  return (
    <div className={styles.root}>
      <Head>
        <meta name={`viewport`}
              content={`width=device-width, initial-scale=1.0`}/>
        <title>{navBar ? navBar.title : `页面`}</title>
      </Head>

      {/*<div style={{background: '#ace0ff'}}>*/}
      {/*  <SafeArea position='top'/>*/}
      {/*</div>*/}

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
        >{navBar.title}</NavBar>
      }

      {/* children */}
      {children}

      {/*<div style={{background: '#ffcfac'}}>*/}
      {/*  <SafeArea position='bottom'/>*/}
      {/*</div>*/}
    </div>
  )
}

export default PageBase
