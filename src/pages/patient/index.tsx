import React, {useEffect} from "react";
import {hasLoginInfo} from "../../utils";
import {useRouter} from "next/router";
import path from "path";


// 使用箭头函数作为函数式组件, 注意: 箭头函数没有this
const Index: React.FC<any> = () => {
  // 函数式组件每次渲染, 函数都会从从头到尾执行一遍, 只不过使用了React Hooks之后, React能够将state保存在某个地方, 并且确保你能访问到, 避免被重新声明变量

  // 实际上由于服务端渲染的原因, 这些判断语句也会在服务端执行, 而服务端的cookie是独立的, 换句话说, 这里获取到的cookie是服务端的, 和我们预期的获取客户端cookie不符
  // 正因为和这个原因, 所以就会提示服务端渲染结果和客户端不符合的报错
  const router = useRouter()
  useEffect(() => {
    if (hasLoginInfo()) {
      // TODO: 检查登录状态, 如果已经失效就清除并且刷新页面
      // TODO: axios需要进行封装, 在某个接口请求返回token失效的时候应当提示信息并跳转到index页面
      router.push(path.join('/patient', '/main', '/home'))
    } else {
      router.push(path.join('/patient', '/fast_login'))
    }
  })
  return (
    <div>检测登录状态...</div>
  )
}

export default Index
