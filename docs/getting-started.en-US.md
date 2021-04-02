---
title: Quick Start
order: 2
group:
  path: /
nav:
  title: Documentation
  path: /docs
---

<h1 align="center">Choerodon-Ui Pro</h1>

<div align="center">

Quickly build and use Choerodon UI scaffolding

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) ![Github Action](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg)[![Build With Choerodon-Ui](https://img.imgdb.cn /item/6004f7ba3ffa7d37b3ec9c3d.jpg)](https://open-hand.gitee.io/choerodon-ui) ![](https://img.imgdb.cn/item/6004e6b03ffa7d37b3e49c8a.jpg)

</div>

-Preview: [preview path](http://134.175.52.77:8000/)

## Features

**TypeScript**: Application-level JavaScript language **elegant and beautiful**: carefully designed based on Choerodon-ui system **Common design patterns**: Refined from typical pages and scenes of middle and back-end applications **Responsive**: Designed for different screen sizes **Internationalization**: Built-in internationalization solutions common to the industry **Best Practices**: Good engineering practices help you continue to produce high-quality code **Mock data**: Practical local data debugging solution **UI test**: Automated testing guarantees the quality of front-end products

## basic structure

```

src

├── components

└── pages

├── ListTableList // No other routing components should be included under routing components. Based on this convention, routing components and non-routing components can be clearly distinguished

| ├── components // You can do more in-depth organization for complex pages, but it is recommended not to exceed three levels

| ├── stores // Store dataSet status for easy unified management and control

| | |—— index // Used to encapsulate the dataSet to the context that the page needs to use

| ├── index.tsx // code of page component

| └── index.less // page style

├── user // For a series of pages, it is recommended to use a single lowercase letter as the group directory

| ├── Login // page under group Login

| └── util.ts // There can be some shared methods, etc., do not recommend and restrict, and do your own organization depending on the business scenario

└── *

```

## Use

```bash

$ mkdir <your-project-name>

$ cd <your-project-name>

$ yarn create umi # or npm create umi

// Install yo globally

npm install -g yo

// Global installation project Generate project

npm install -g generator-choerodon-ui-pro

// Generate scaffolding

yo choerodon-ui-pro

// Enter the new project information including: project name, description, author

$ git init

$ npm install

$ npm start # visit http://localhost:8000

```

## Support environment

Modern browsers and IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos /master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br >Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master /src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /> ](http://godban.gith ub.io/browsers-support-badges/)</br>Opera |

| --- | --- | --- | --- | --- |

| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Participate in Contribution

We welcome your contribution very much. You can build with us in the following ways.

-Use Choerodon-ui Pro in your company or personal projects.

-Report bugs or consult with [Issue](https://github.com/sunchir/choerodon-ui-pro/issues).

-Submit [Pull Request](https://github.com/sunchir/choerodon-ui-pro/pulls) to improve the code of Pro.
