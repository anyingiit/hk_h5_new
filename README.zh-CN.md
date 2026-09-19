[English](README.md) · **简体中文**

> 英文版是规范版本。本页与 [README.md](README.md) 不一致时，以英文版为准。

<!-- translation-of: README.md sha256:a13832df789bae1b -->

<!-- Source: Best-README-Template BLANK_README (Unlicense) — https://github.com/othneildrew/Best-README-Template -->
<a id="readme-top"></a>

# hk_h5_new

一个基于 Next.js 和 Ant Design Mobile 的远程医疗平台网页端（H5），分为患者端和医生端两部分，支持手机号登录、注册以及医生发起的问诊。

[![CI](https://github.com/anyingiit/hk_h5_new/actions/workflows/ci.yml/badge.svg)](https://github.com/anyingiit/hk_h5_new/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/anyingiit/hk_h5_new)](LICENSE)

[报告问题](https://github.com/anyingiit/hk_h5_new/issues/new?template=bug_report.yml) · [提出需求](https://github.com/anyingiit/hk_h5_new/issues/new?template=feature_request.yml)

<details>
  <summary>目录</summary>
  <ol>
    <li><a href="#about-the-project">关于本项目</a></li>
    <li><a href="#getting-started">开始使用</a></li>
    <li><a href="#usage">用法</a></li>
    <li><a href="#contributing">参与贡献</a></li>
    <li><a href="#license">许可证</a></li>
    <li><a href="#contact">联系方式</a></li>
  </ol>
</details>

## 关于本项目

hk_h5_new 是一个基于 Next.js 和 Ant Design Mobile 构建、以 React 渲染的移动端网页（H5）。
同一个应用里包含两个互相独立的部分：

- 患者端：访客可以用手机号登录；如果尚未注册，同一个页面会直接引导其完成注册
  （`src/pages/patient/fast_login.tsx`）。当页面带上某个医生的 ID 打开时，
  新注册的患者还可以顺带绑定到这位医生。
- 医生端：已登录的医生维护一份可搜索的协作医生列表（`src/pages/doctor/main/home/cooperative_group/index.tsx`，
  支持按姓名或拼音搜索），并可以为某位患者打开问诊页面，页面上预留了消息框、
  视频通话入口以及查看病历的按钮（`send_message.tsx`）。

所有请求都经过同一个 Axios 客户端，统一处理登录失效和请求失败等情况
（`src/utils/http/http.ts`），该客户端访问的是一个独立部署的后端接口，而不是
由本项目自己提供接口服务。

计划中的功能与已知问题，见 [open issues](https://github.com/anyingiit/hk_h5_new/issues)。

## 开始使用

### 环境要求

- Node.js，用于运行 Next.js 应用；Dockerfile 在 `node:alpine` 上构建并启动它
- Yarn，因为依赖版本锁定在 `yarn.lock` 中，Dockerfile 也是用 `yarn install --frozen-lockfile` 安装依赖的

### 安装

```sh
git clone https://github.com/anyingiit/hk_h5_new.git
cd hk_h5_new
yarn install --frozen-lockfile
```

## 用法

启动开发服务器：

```sh
yarn dev
```

这条命令实际运行的是 `next dev -H 0.0.0.0`，所以应用不仅可以通过 `localhost`
访问，同一网络下的其他设备（比如手机）也能连上，方便调试移动端页面。若要像
Dockerfile 那样构建并运行生产环境版本：

```sh
yarn build
yarn start
```

## 参与贡献

欢迎参与。[CONTRIBUTING.md](CONTRIBUTING.md) 说明如何提交 issue 或 pull request，[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) 说明对所有参与者的行为要求。

请不要在公开的 issue 或 pull request 中报告安全问题。[SECURITY.md](SECURITY.md) 说明了私下报告的方式。

## 许可证

以 MIT 许可证分发。详见 [LICENSE](LICENSE)。

## 联系方式

项目地址：[https://github.com/anyingiit/hk_h5_new](https://github.com/anyingiit/hk_h5_new)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
