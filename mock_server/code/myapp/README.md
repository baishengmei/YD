## Mock Server — Provide convenience for the front end developer testing

为了更好分工合作，让前后端在互不依赖的情况下进行开发，利用mockserver模拟前端以及服务端数据，提供给前后端开发人员测试.
目前的开发阶段为：为前端开发mock数据。该项目使用 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 生成，里面包含了诸多当前较新的技术。

### 当前版本功能

v1.0.0 - 2017-07-17

- 配置页面基本功能

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
$ git clone sa_gitlab@gitlab.corp.youdao.com:webfront-ad/mock_server.git
$ cd mock_server/code/myapp
$ yarn install
$ yarn start:test(windows)
  yarn start(mac)
```

### 配置页面使用说明

- “规则名”、“项目组名”、“Url”为必填项；
- “Constraint”：设置请求的约束条件，若置空，则默认为true；
- “约束条件”、“约束表达式”处的书写方式：按照例子所示，$h.name表示request请求中header中的name字段；
- “响应条件”：若置空，则默认为true；
- “响应条件”执行后为true，则会返回对应的response数据；
- “响应条件”处书写方式：使用$G1、$G以及&&、||等操作符；例如：$G1，$G1&&$G2等；
- 若不同响应条件时，响应不同，那么可以通过“新增响应”来设置更多响应条件下的响应；
- 请求mock-server系统是，访问链接为：123.0.0.:3000/test/项目组名/url
