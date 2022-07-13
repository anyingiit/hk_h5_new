import React from "react";


const Index: React.FC<any> = () => {
  // 函数式组件每次渲染, 函数都会从从头到尾执行一遍, 只不过使用了React Hooks之后, React能够将state保存在某个地方, 并且确保你能访问到, 避免被重新声明变量
  return (
    <div>Hello World</div>
  )
}

export default Index
