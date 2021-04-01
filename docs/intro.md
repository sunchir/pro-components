---
title: 简介
order: 1
group:
  path: /
nav:
  title: 文档
  order: 1
  path: /docs
---

### 风格指南

我们使用自动化代码格式化软件 [`Prettier`](https://prettier.io/)。 对代码做出更改后，运行 `npm run prettier`。当然我们更推荐 prettier 的插件，随时格式化代码。

> 我们的 CI 会检查代码是否被 prettier，在提交代码前最好执行一下 `npm run prettier`。

之后，`linter` 会捕获代码中可能出现的多数问题。 你可以运行 `npm run lint` 来检查代码风格状态。

不过，`linter` 也有不能搞定的一些风格。如果有些东西不确定，请查看 [Airbnb’s Style Guide](https://github.com/airbnb/javascript) 来指导自己。

### 开发工作流

安装完成后你可以使用以下命令：

- `yarn start` 预览你的改动
- `yarn lint` 检查代码风格
- `yarn tsc` 检查 TypeScript 是否符合规范
- `yarn test` 测试代码是否可以通过测试用例
- `yarn test:coverage` 测试仓库的测试覆盖率
- `yarn build` 编译当前组件库
- `yarn createRelease` 基于最近提交更具 commit-msg 生成 changelog

### 提交信息校验

- `💥 feat(compiler): add 'comments' option`
- `🐛 fix(compiler): fix some bug`
- `📝 docs(compiler): add some docs`
- `💄 UI(compiler): better styles`
- `🎨 chore(compiler): do something`

提交时候会自动进行提交信息校验 [校验规范学习](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
