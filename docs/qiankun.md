---
title: qiankun
order: 4
group:
  path: /
nav:
  path: /docs
---

## Qiankun 集成

qiankun 介绍 qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

什么是微前端微前端架构具备以下几个核心价值：

- 技术栈无关主框架不限制接入应用的技术栈，子应用具备完全自主权
- 独立开发、独立部署子应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 增量升级在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
- 独立运行时每个子应用之间状态隔离，运行时状态不共享

## 集成步骤

由于本项目基于 umi 所以集成乾坤十分简单

### 安装 quankun 插件

```bash

   yarn add @umijs/plugin-qiankun -D
```

### 修改端口

在根目录生成一个.env 文件配置对应的启动端口

PORT=3000

### 修改 congig 配置

```js
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
        },
      ],
    },
  },
```

### 修改路由配置

```js
    {
            path: '/app1/project',
            microApp: 'app1',
    },
```

### 删除多余页面配置和样式

由于 乾坤会自建一个`<div id="root-master"></div>`所以需要删除以前的`<div id="app"></div>`节点配置。

### 修剪以前项目移除一些不必要的页面组成以及集成子应用为[乾坤子应用](https://qiankun.umijs.org/)

基本就实现了一个 c7n-pro 为主应用的前端微服务。更多细节点击[乾坤](https://qiankun.umijs.org/) ![预览](https://img.imgdb.cn/item/606d50a78322e6675cbd12a1.jpg)
