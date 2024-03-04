# Micro App + Vite(主应用)

这是个基于Micro App + Vite 的微应用模板，用于开发微应用。

### 微前端

- 微前端的概念是由ThoughtWorks在2016年提出的，它借鉴了微服务的架构理念，核心在于将一个庞大的前端应用拆分成多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用，或者将原本运行已久、没有关联的几个应用融合为一个应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活。

- 它主要解决了两个问题：
  - 随着项目迭代应用越来越庞大，难以维护。
  - 跨团队或跨部门协作开发项目导致效率低下的问题。

### 关于micro-app

- micro-app是由京东前端团队推出的一款微前端框架，它借鉴了WebComponent的思想，通过js沙箱、样式隔离、元素隔离、路由隔离模拟实现了ShadowDom的隔离特性，
- 并结合CustomElement将微前端封装成一个类WebComponent组件，从而实现微前端的组件化渲染，旨在降低上手难度、提升工作效率。
- micro-app和技术栈无关，也不和业务绑定，可以用于任何前端框架。

## 项目说明
- 项目是为了解决移动端、PC端、H5端的开发问题，通过将项目拆分成多个独立的微应用，实现各个应用的独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用。
- 项目只是一个demo，用于展示微前端的开发流程。拉下来项目后建议自行改造，可以用于开发任何项目。
- 项目的base是主应用，可以作为开发的起始模板。理论上base可以是vue，react，angular都行，这里的demo是vite+vue3的， web，mobile是vue项目，h5端是react项目。
- 项目是标准应用，可以作为开发的起始模板。packages目录是微应用的标准模板，可以用于开发任何微应用。

## 项目结构

- packages/base - 基础模板《主应用》
- packages/mobile - 移动端模板《子应用》
- packages/web - PC端模板《子应用》
- packages/h5 - h5端模板《子应用》

## 开发环境

- [Node.js](https://nodejs.org/en/) (>=16.x)
- [yarn](https://classic.yarnpkg.com/en/docs/install/)

## 安装依赖

```bash
yarn install
```

## 开发

```bash
yarn start:base # post:3000
yarn start:mobile # post:3001
yarn start:web # post:3002
 ```

## 打包

```bash
yarn build
```

## 本地运行

```bash
npm i -g http-server
yarn add http-server --global
http-server ./dist
或者
npm run server()
```

## 相关链接

- [micro-app](https://github.com/micro-app/micro-app)
- [micro-app docs](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/start)
- [Vite](https://vitejs.dev/)
- [Vue](https://v3.cn.vuejs.org/)
- [Element Plus](https://element-plus.gitee.io/#/zh-CN)
- [Vant 中文文档](https://vant-contrib.gitee.io/vant/#/zh-CN/home)
- [Vite + Vue3 + Element Plus](https://github.com/element-plus/vite-plugin-element-plus/tree/next/examples/vue3-vite]
- [react](https://reactjs.org/]
- [antd](https://ant.design/)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (
  and disable
  Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
