---
title: README.md
birthtime: 2024/1/23 18:28:31
mtime: 2024/1/23 18:28:31
---

# Multi-platform deploy
## Github Pages
- 移除 `.gitignore`文件中对 `/out/`的过滤
- 在`next.config.mjs`中添加：
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 导出
  basePath: "/monk-site", // 设置为仓库名
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default nextConfig;
```
- 在 `package.json`中添加命令
```json
"scripts": {
    // some cmd ......
    "deploy": "next build && touch out/.nojekyll && git add out/ && git commit -m \"Deploy\" && git subtree push --prefix out origin gh-pages"
}
```
- 执行 `npm run deploy`,将会自动添加gh-pages分支，修改项目，再次提交。
- 可访问`https://lokavit.github.io/monk-site/`


```bash
npm install react-icons # 图标 速查:https://react-icons.github.io/react-icons/
```




## 项目结构
- _posts:存放所有文字内容。不应放在代码内。
- app:页面
- components:组件
- data:数据 object/JSON
- lib/utils/type/interfaces/


## HOME
- 文字渐变
- Skills：所有使用过的技术栈，其图标散列展示。
- 全部文章，最新发表，块状展示，左侧发布时间，右侧标题，标签，摘要，更多
-

## CODE NOVEL LIFE
- 同为文章。相同方式展示。书籍效果。从导航点击进入时，默认只显示是当前分类。
- - CODE:整理必要记录，可拆分。
- 文章分类:使用tags或者categories

```
列表页面

从导航Novel点击，页面为：
Novel

prat:6 words:所有小说总字数

以书的特效展示每本书。点击进入选中书的列表页，页面为：
书名
desc
状态:完结 章节数：13 字数：333

目录，自动折行。

```

```
正文页面

标题
分类 作者 日期 字数 阅读时间 阅读量

上一章 下一章
```


## PROJECT
- 值得展示的项目，块状，横向流布局。

## ARCHIVE
- 块状 横向流布局。年份倒序
- 每块head区域左侧年份，右侧一些其它内容，body区域列表当年所有文章。按日期倒序

## ABOUT
- Skills：与主页同用一个组件
- Projects:一些值得展示的项目



## mdx code snippet


- https://docusaurus.io/docs/next

- reward


- smart connent

- blog

- novel

- contentlayer
next-contentlayer

https://nextjs.org/docs/app/building-your-application/configuring/mdx
https://nextjs.org/learn-pages-router/basics/data-fetching/blog-data

https://www.gptsapp.io/s?k=Content+Creation
https://exploringjs.com/index.html
https://github.com/PromtEngineer/localGPT
https://web3.career/learn-web3

https://github.com/jordon0329/Next.js-Metamask-Vault-Contract

https://github.com/byoungd/English-level-up-tips

https://wiki.eryajf.net/
