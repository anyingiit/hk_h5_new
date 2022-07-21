import React from "react";
import {AppProps} from "next/app";
import 'antd/dist/antd.css';

export default class App extends React.Component<AppProps, any> {
  render() {
    const {Component, pageProps} = this.props
    return <Component {...pageProps}/>
  }
}
