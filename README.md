<div align="center"> <a href="https://codeup.aliyun.com/66ce731b37a6d8817228e2d6/front-template-project"> 
<h1>front-template-project</h1></a>
</div>

### 目录结构
- [简介](#简介)
- [准备](#准备)
- [安装使用](#安装使用)
- [分支说明](#分支说明)
- [项目结构](#项目结构)

## 简介
- **项目名称**
front-template-project
- **项目描述**
本项目是一个web端前端模板项目，web端的业务项目均可用该模板项目作为初始化模板。本项目使用了 `vue3`、`vite5`、`typescript`、`pinia`等主流技术开发。
项目具有Admin端、H5端(暂无)、Front端(暂无)三种模板。
- **前端工程化文档**

## 准备

- **node**: >= 20
- **ide工具**: vscode / webstorm
- **git**: git
- **nvm**: nvm
- **pnpm**: pnpm
- **云效**: 云效账号

| 类目 | 地址 | 作用 |
| -------------------- | ------------- |  ------------- |
| node | [下载地址](http://nodejs.org/)  | 安装环境 |
| git | [下载地址](https://git-scm.com/) | 代码协作 |
| nvm | [下载地址](https://github.com/nvm-sh/nvm)  | 管理node版本 还需额外配置 |
| pnpm | [下载地址](https://www.pnpm.cn/)  | 依赖包管理工具 |
| vscode | [下载地址](https://code.visualstudio.com/) | 代码工具 |
| 云效 | [访问地址](https://codeup.aliyun.com/66ce731b37a6d8817228e2d6/front-template-project) | 代码仓库 |
| vue3 | [文档地址](https://cn.vuejs.org/)  | 前端框架 |
| vite5 | [文档地址](https://vitejs.cn/vite5-cn/)  | 打包构建工具 |
| pinia | [文档地址](https://pinia.vuejs.org/zh/)  | 状态管理工具 |
| typescript | [文档地址](https://www.typescriptlang.org/)  | js的超集 |
| es6 | [文档地址](https://es6.ruanyifeng.com/)  | 新语法 |
| whistle | [文档地址](https://wproxy.org/whistle/)  | 代理工具 |
| element-plus | [文档地址](https://element-plus.org/zh-CN/) | UI组件库 |



## 安装使用

- 获取项目代码（请使用ssh）

```bash
git clone git@github.com:lz1084342435/front-template-project.git
```

- 安装依赖

```bash
cd front-template-project

nvm use 20

pnpm install

```

- 运行（之后可根据环境添加不同指令）

```bash
pnpm run dev
```


- 打包（之后可根据环境添加不同指令）

```bash
pnpm run build
```

- 提交代码
```bash
git add .
git commit -m '<type>[optional scope]: <subject>'
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |



## 分支说明
- **master**：最新稳定的通用版分支，所有分支的基础
- **develop**：通用分支，所有分支的基础
- **h5**：h5分支，merge from master, 额外包含h5特性（暂无）
- **front**：front分支，merge from master, 额外包含front特性（暂无）
- **admin**：admin分支，merge from front, 额外包含front管理端特性


## 主要项目结构
├──.husky                      # git钩子管理工具
├──.vscode                     # 项目vscode配置
├── src/                       # 源代码目录
│   ├── api/                   # api请求目录
│   ├── assets/                # 静态资源（图片、字体、样式等）
│   ├── components/            # 复用的 Vue 组件
│   ├── composables/           # hooks函数
│   ├── icons/                 # svg文件夹
│   ├── layout/                # 布局流
│   ├── router/                # 路由配置
│   ├── stores/                # Pinia 状态管理
│   ├── theme/                 # 换肤scss
│   ├── utils/                 # 工具函数
│   ├── views/                 # 页面级组件
│   ├── main.ts                # 入口文件
│   ├── permission.ts          # 权限判断
│   └── App.vue                # 根组件
├── public/                    # 公共文件 (不会被打包的静态资源)
├── types/                     # 定义ts类型
├── .env                       # 环境变量配置文件
├── package.json               # 项目依赖及脚本
├── README.md                  # 项目说明文档
└── vite.config.ts             # Vite 配置文件