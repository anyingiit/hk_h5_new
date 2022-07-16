[![wakatime](https://wakatime.com/badge/user/8962de91-9fea-4e00-939e-6117cafe1eb2/project/d00ae108-8626-43de-84bb-80fbb7194f62.svg)](https://wakatime.com/badge/user/8962de91-9fea-4e00-939e-6117cafe1eb2/project/d00ae108-8626-43de-84bb-80fbb7194f62)

# hk_h5_new

## 开发和构建
### 开发
```shell
yarn install
yarn dev
yarn test
```

### 构建和运行
```shell
yarn install
yarn build
yarn start
```

## 开发, 测试, 生产的部署
### 测试
#### 服务器地址
已部署两个服务器
1. AnYing的个人服务器, 更新频率: 由AnYing自定
   1. 地址: [http://101.42.99.142:3000](http://101.42.99.142:3000)
2. AnYing的vercel, 更新频率: 每次提交
   1. 地址: [https://hk-h5-new.vercel.app](https://hk-h5-new.vercel.app)

## 框架选型

* render: React + Next.js
* UI: Ant Design Mobile

## 规范

### git提交规范

#### 提交消息格式

```
修改类型(影响范围): 标题
<--空行-->
[正文]
<--空行-->
[页脚]
```

#### 影响范围

范围不是固定值，它可以是你提交代码实际影响到的任何内容。例如$location、$browser、$compile、$rootScope、ngHref、ngClick、ngView等，唯一需要注意的是它必须足够简短。
当修改影响多个范围时，也可以使用“*”。

#### 修改类型

* feat：提交新功能
* fix：修复了bug
* docs：只修改了文档
* style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
* refactor：代码重构，既没修复bug也没有添加新功能
* perf：性能优化，提高性能的代码更改
* test：添加或修改代码测试
* chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

参考: [https://zhuanlan.zhihu.com/p/67804026]()

## TODO

- [x] (已暂时取消, 因为并不影响开发)全局Toast封装. 如果做的话,
  可以参考: [https://juejin.cn/post/6844903651035578376](https://juejin.cn/post/6844903651035578376)
- [ ] (次要)研究该项目的Dockerfile, 解决构建慢的问题

## 框架, 第三方模块, SDK等 文档

* 微信 JS
  SDK: [https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1)
* GIT提交规范: [https://zhuanlan.zhihu.com/p/67804026](https://zhuanlan.zhihu.com/p/67804026)
* React: [https://react.docschina.org/docs/getting-started.html](https://react.docschina.org/docs/getting-started.html)
* next.js: [https://www.nextjs.cn/docs/getting-started](https://www.nextjs.cn/docs/getting-started)
* Ant Design Mobile: [https://mobile.ant.design/zh](https://mobile.ant.design/zh)
