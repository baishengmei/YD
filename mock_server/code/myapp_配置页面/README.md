## ZHIXUAN 2017 — Youdao DSP Publish System 2017

有道智选是网易有道推出的实时竞价精准广告投放平台。目前的智选系统使用java web技术开发的，系统比较老旧，易用性和用户体验低，且开发维护成本较高。为了解决以上的问题，决定使用前后端分离将现有系统进行重构，重新设计UI和用户交互，改善系统易用性，提高用户体验。该项目使用 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 生成，里面包含了诸多当前较新的技术。

### 当前版本功能

v1.0.0 - 2017-04-10

- 首页基本功能

### 部署说明

#### 部署前的准备

部署前确保系统中已安装以下环境：

- node: >=6 <7 ( 推荐 node 6.10.2 )
- npm: >=3.x <4 ( 跟随 node 的版本变化 )
- git

将`node`和`npm`路径添加到全局环境变量中，linux 环境建议用 [nvm](https://github.com/creationix/nvm) 管理多版本 node，windows 环境建议用 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 管理多版本 node。

另外，建议将 npm 源设置为 taobao npm 镜像，加快访问速度。命令如下：

```shell
npm config set registry=https://registry.npm.taobao.org
```

安装 yarn

```shell
npm install -g yarn
```

#### 准备项目

如果是第一次部署工程，执行下面命令：

```shell
$ git clone https://gitlab.corp.youdao.com/webfront-ad/zhixuan2017.git
$ cd zhixuan2017
$ yarn install
```

#### 如何构建

构建前需要先修改上线配置文件，配置文件为 `src/config.js`，需要修改其中 `[pro]` 下的配置项：

```js
var environment = {
  [test]: {
    nodeHost: 'zx.youdao.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.youdao.com:19500' // 'nb269x.corp.youdao.com:10017'
  },
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
$ yarn build
```

#### 上线命令

在`build`目录下执行下面的命令：

<!-- 旧的启动命令，但是在 centos 下终端关闭会导致服务退出  -->
<!-- npm start > ../logs/serve-`date +%Y%m%d`.log 2>&1 & -->
```shell
env NODE_ENV=production forever start server.js
// or
npm start
```

*Note: pm2 比 forever 更强大，可以在之后的应用中考虑使用。*

然后配置下域名`zhixuan.youdao.com`。

如果上线多台服务，nginx需要按照ip分流，即某ip要固定分流到某台server上。

浏览器中访问 [http://zhixuan.youdao.com](http://zhixuan.youdao.com)。

### CHANGELOG

[Change log](./CHANGELOG.md)

### 开发文档

更详细的开发相关说明参见 [Dev Read](./devRead.md)
