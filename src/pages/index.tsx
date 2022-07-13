import React from "react";


const Index: React.FC<any> = () => {
  // 其实相当于每次重新渲染, 函数都会从从头到尾执行一遍, 只不过使用了react hooks 能够将state保存在某个地方, 避免被重新声明变量
  return (
    <div>Hello World</div>
  )
}

export default Index
