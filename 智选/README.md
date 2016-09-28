## ZHIXUAN — Youdao DSP Publish System

有道智选是网易有道推出的实时竞价精准广告投放平台。目前的智选系统使用java web技术开发的，系统比较老旧，易用性和用户体验低，且开发维护成本较高。为了解决以上的问题，决定使用前后端分离将现有系统进行重构，重新设计UI和用户交互，改善系统易用性，提高用户体验。该项目使用 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 生成，里面包含了诸多当前较新的技术。

### 当前版本功能

v1.0.0 - 2016-09-13

- 首页基本功能

### 项目结构

```
.
├── /build/                     # The folder for compiled output
├── /logs/                      # The folder for logs
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /api/                   # API / Relay endpoints
|   |   └── /delegates/         # split java request into pieces of separate requests
│   ├── /components/            # React components
│   ├── /constants/             # Constants (action types etc.)
|   ├── /containers/            # React container components
│   ├── /core/                  # Core framework and utility functions
│   ├── /decorators/            # Higher-order React components
│   ├── /images/                # common images folder
│   ├── /middlewares/           # express middlewares
│   ├── /redux/                 # redux related files
│   |   ├── /middlewares/       # redux middlewares
│   |   ├── /reducers/          # redux reducers
|   |   └── /store/             # redux store that contains the application state
│   ├── /appEntry.js            # Client-side startup script after login
│   ├── /clientContext.js       # client entry common code
│   ├── /config.js              # server settings
│   ├── /loginEntry.js          # Client-side login page startup script
│   ├── /loginRoute.js          # Universal (isomorphic) login page route
│   ├── /routes.js              # Universal (isomorphic) application routes after login
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /bundleSingle.js        # Bundle single entry through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /serve.js               # Launches the Node.js/Express web server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
|—— gulpfile.js                 # Helper function for creating sample component
|—— npm-shrinkwrap.json         # The list of npm packages and their freezed versions
└── package.json                # The list of 3rd party libraries and utilities
```

### 开发部署说明

#### 部署前的准备

部署前确保系统中已安装以下环境：

- node: >=5.10.0 <7 ( node 6.3.x 除外，上线推荐 node 6.5.0 )
- npm: >=3.8.3 <4 ( 跟随 node 的版本变化 )
- git

将`node`和`npm`路径添加到全局环境变量中，linux 环境建议用 [n](https://www.npmjs.com/package/n) 管理多版本 node，windows 环境建议用 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 管理多版本 node。

#### 准备项目

如果是第一次部署工程，执行下面命令：

```shell
$ git clone https://gitlab.corp.youdao.com/webfront-ad/zhixuan.git
$ cd zhixuan
$ npm install
```

如果工程已经存在，则在工程根目录下执行：

```shell
git checkout -f
npm install
```

#### 如何构建

构建前需要先修改上线配置文件，配置文件为 `src/config.js`，需要修改其中 `[pro]` 下的配置项：

```js
var environment = {
  [dev]: {
    nodeHost: 'zx.youdao.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.youdao.com:19500' // 'nb269x.corp.youdao.com:10017'
  },
  [pro]: {
    nodeHost: 'zx.youdao.com:5000',
    nodePort: 5000,
    javaHost: 'nb269x.corp.youdao.com:10017'
  }
}[env];
```

- nodeAsHost： 上线后网站对外服务的域名，如 `zhixuan.youdao.com`。
- nodePort： node 服务的启动端口。
- javaHost： node 对应的 java 服务接口的 Host。

配置改好后，在工程根目录下执行下面命令构建/打包项目。

```shell
$ npm run build
```

#### 上线命令

在`build`目录下执行下面的命令：

```shell
npm start > ../logs/server-`date +%Y%m%d`.log 2>&1 &
```

然后配置下域名`zhixuan.youdao.com`。

如果上线多台服务，nginx需要按照ip分流，即某ip要固定分流到某台server上。

浏览器中访问 [http://zhixuan.youdao.com](http://zhixuan.youdao.com)。

#### 如何调试

在工程根目录下执行下面的命令：

```
$ npm start
```

默认源码不进行压缩，如果需要压缩，只需要添加`-- --release`参数即可。

浏览器中访问 [http://zhixuan.youdao.com:3000/](http://zhixuan.youdao.com:3000/)，配置下本地host映射即可。

### 备注

一、 上线依赖问题

```js
// 冻结所拥有依赖，包括 dev 依赖
// dev 依赖 redbox-react
// 但是 1.2.10 导致运行出错
// 所以需要将所有依赖都冻结
npm shrinkwrap --dev
```

二、 安装依赖

如果工程下面存在 npm-shrinkwrap.json，那么 npm install 会忽略 package.json，按照这个文件中的版本号去安装依赖。如果想根据 package.json 安装依赖，执行如下命令：

```js
npm install --ignore-shrinkwrap
```


### CHANGELOG

[Change log](./CHANGELOG.md)