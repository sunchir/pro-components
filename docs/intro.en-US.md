---
title: Introduction
order: 1
group:
  path: /
nav:
  title: Documentation
  order: 1
  path: /docs
---

### Developing workflows

After the installation is complete you can use the following command.

- `yarn start` to preview your changes
- `yarn lint` to check the code style
- `yarn tsc` to check if TypeScript conforms to the specification
- `yarn test` Test if the code passes the test case
- `yarn test:coverage` Test the test coverage of the repository
- `yarn build` Compile the current component library

### Submit information verification

- `💥 feat(compiler): add 'comments' option`
- `🐛 fix(compiler): fix some bug`
- `📝 docs(compiler): add some docs`
- `💄 UI(compiler): better styles`
- `🎨 chore(compiler): do something`

The submission information will be verified automatically when submitting [Verification specification learning](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

We recommend running `yarn test` or the aforementioned linter to make sure that your code changes do not affect the original functionality and that every line of code you write is tested correctly, which will improve the overall quality of the component library anyway.
