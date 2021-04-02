---
title: 快速开始
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
---

<h1 align="center">Choerodon-Ui Pro</h1>

<div align="center">

快速搭建使用 Choerodon UI 脚手架

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) ![Github Action](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg)[![Build With Choerodon-Ui](https://img.imgdb.cn/item/6004f7ba3ffa7d37b3ec9c3d.jpg)](https://open-hand.gitee.io/choerodon-ui) ![](https://img.imgdb.cn/item/6004e6b03ffa7d37b3e49c8a.jpg)

</div>

- 预览：[预览地址](http://134.175.52.77:8000/)

## 特性

- **TypeScript**: 应用程序级 JavaScript 的语言
- **优雅美观**：基于 Choerodon-ui 体系精心设计
- **常见设计模式**：提炼自中后台应用的典型页面和场景
- **主题**：可配置的主题满足多样化的品牌诉求
- **国际化**：内建业界通用的国际化方案
- **最佳实践**：良好的工程实践助您持续产出高质量代码
- **Mock 数据**：实用的本地数据调试方案
- **UI 测试**：自动化测试保障前端产品质量

## 基本结构

```
src
├── components
└── pages
    ├── ListTableList  // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
    |   ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
    |   ├── stores     // 存储dataSet状态让便于统一管理和控制
    |   |   |—— index  // 用于封装该页面需要使用的dataSet到context
    |   ├── index.tsx  // 页面组件的代码
    |   └── index.less // 页面样式
    ├── user           // 一系列页面推荐通过小写的单一字母做 group 目录
    |   ├── Login      // group 下的页面 Login
    |   └── util.ts    // 这里可以有一些共用方法之类，不做推荐和约束，看业务场景自行做组织
    └── *
```

## 使用

```bash
$ mkdir <your-project-name>
$ cd <your-project-name>
$ yarn create umi  # or npm create umi

// 全局安装 yo
npm install -g yo

// 全局安装项目 生成项目
npm install -g generator-choerodon-ui-pro

// 生成脚手架
yo choerodon-ui-pro

// 输入新建项目信息包括：项目名、描述、作者

$ git init
$ npm install
$ npm start         # visit http://localhost:8000
```

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建;

- 在你的公司或个人项目中使用 Choerodon-ui Pro。
- 通过 [Issue](https://github.com/sunchir/choerodon-ui-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/sunchir/choerodon-ui-pro/pulls) 改进 Pro 的代码。
