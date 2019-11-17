## yoouuddaaoo DSP Publish System（新智选）开发文档

yoouuddaaoo智选是yoouuddaaoo推出的实时竞价精准广告投放平台。目前的智选系统使用java web技术开发的，系统比较老旧，易用性和用户体验低，且开发维护成本较高。为了解决以上的问题，决定使用前后端分离将现有系统进行重构，重新设计 UI 和用户交互，改善系统易用性，提高用户体验。该项目使用 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 生成，里面包含了诸多当前较新的技术。

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
│   ├── /coverage.js            # code coverage script
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches the Node.js/Express web server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
|—— .babelrc                    # Configurations for babel-register used in mocha compiling es6 and can be replaced in package.json 
|—— .eslintignore               # Configurations for eslint ignoring files
|—— .eslintrc.js                # Configurations for eslint rules and settings
|—— devRead.md                  # development notes
|—— framework.md                # project framework introduction
|—— gulpfile.js                 # Helper function for creating sample component
|—— npm-shrinkwrap.json         # The list of npm packages and their freezed versions
|—— TODO.md                     # project todo list
└── package.json                # The list of 3rd party libraries and utilities
```

### 开发部署说明

#### 写在前面的话

本项目使用诸多前端成熟技术来规范开发流程，技术包括：

- eslint 检查 js 编码规范，规范借鉴 [Airbnb javascript style guide](https://github.com/airbnb/javascript) 并在此基础上做了少量的改变
- 测试用例和代码覆盖率来保证代码的健壮性和质量
- webpack 及脚本用于项目的构建和调试
- git hook 来约束代码提交

在降低上线和维护的成本方面做了一些工作：

- log 日志用于记录系统的运行情况
- npm-shrinkwrap 来保证上线的代码版本和开发稳定版是一致的

为了保证系统开发的质量和稳定性，开发前需要对开发流程中涉及的 4 个方面的技术有一个大概的了解。首先需要看一遍 Airbnb 的 javascript 编码规范，掌握之后才能开始编码。开发新功能时，需要添加完整的测试用例，同时确保代码覆盖率达到要求，否则提交和 push 的时候会验证失败而无法完成操作。构建和调试部分参考下面章节即可；git hook 只需要有一定了解，不需要达到特别的要求。

为了使 eslint 可以在编码过程中一直起到提示作用，需要在开发环境中集成必要的插件，这里以 Sublime 为例介绍，Webstorm 需要自己查找配置。 Sublime 需要安装 SublimeLinter 和 SublimeLinter-contrib-eslint 两个插件，并对 SublimeLinter 的 user settings 做如下配置：

```json
{
    "user": {
        "debug": true,
        "delay": 0.25,
        "error_color": "D02000",
        "gutter_theme": "Packages/SublimeLinter/gutter-themes/Blueberry/round/Blueberry - round.gutter-theme",
        "gutter_theme_excludes": [],
        "lint_mode": "background",
        "linters": {
            "eslint": {
                "@disable": false,
                "args": [],
                "excludes": []
            }
        },
        "mark_style": "outline",
        "no_column_highlights_line": false,
        "passive_warnings": false,
        "paths": {
            "linux": [],
            "osx": [],
            "windows": [
                "node_modules/.bin/eslint.cmd"
            ]
        },
        "python_paths": {
            "linux": [],
            "osx": [],
            "windows": []
        },
        "rc_search_limit": 3,
        "shell_timeout": 10,
        "show_errors_on_save": false,
        "show_marks_in_minimap": true,
        "syntax_map": {
            "html (django)": "html",
            "html (rails)": "html",
            "html 5": "html",
            "javascript (babel)": "javascript",
            "magicpython": "python",
            "php": "html",
            "python django": "python",
            "pythonimproved": "python"
        },
        "warning_color": "DDB700",
        "wrap_find": true
    }
}
```

到此，eslint 相关配置就弄好了。

#### 开发/部署前的准备

部署前确保系统中已安装以下环境：

- node: >=5.10.0 <7 ( node 6.3.x 除外，上线推荐 node 6.9.1 )
- npm: >=3.8.3 <4 ( 跟随 node 的版本变化 )
- git

将`node`和`npm`路径添加到全局环境变量中，linux 环境建议用 [n](https://www.npmjs.com/package/n) 管理多版本 node，windows 环境建议用 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 管理多版本 node。

另外，建议将 npm 源设置为 taobao npm 镜像，加快访问速度。命令如下：

```shell
npm config set registry https://registry.npm.taobao.org 
```

#### 准备项目

如果是第一次部署工程，执行下面命令：

```shell
$ git clone https://gitlab.corp.yoouuddaaoo.com/webfront-ad/zhixuan.git
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
  [test]: {
    nodeHost: 'zx.yoouuddaaoo.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.yoouuddaaoo.com:19500' // 'nb269x.corp.yoouuddaaoo.com:10017'
  },
  [dev]: {
    nodeHost: 'zx.yoouuddaaoo.com:3000',
    nodePort: 5000,
    javaHost: 'qt106x.corp.yoouuddaaoo.com:19500' // 'nb269x.corp.yoouuddaaoo.com:10017'
  },
  [pro]: {
    nodeHost: 'zx.yoouuddaaoo.com:5000',
    nodePort: 5000,
    javaHost: 'nb269x.corp.yoouuddaaoo.com:10017'
  }
}[env];
```

- nodeAsHost： 上线后网站对外服务的域名，如 `zhixuan.yoouuddaaoo.com`。
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

然后配置下域名`zhixuan.yoouuddaaoo.com`。

如果上线多台服务，nginx需要按照ip分流，即某ip要固定分流到某台server上。

浏览器中访问 [http://zhixuan.yoouuddaaoo.com](http://zhixuan.yoouuddaaoo.com)。

#### 如何调试

在工程根目录下执行下面的命令：

```
$ npm start
```

默认源码不进行压缩，如果需要压缩，只需要添加`-- --release`参数即可。

浏览器中访问 [http://zhixuan.yoouuddaaoo.com:3000/](http://zhixuan.yoouuddaaoo.com:3000/)，配置下本地host映射即可。

### 备注

一、 上线依赖问题

上线前应该冻结所有依赖，包括 dev 依赖。比如： redbox-react 1.2.10 版本会导致运行出错，需要冻结开发版本以免在线上出现类似问题。

```js
npm shrinkwrap --dev
```

二、 安装依赖

如果工程下面存在 npm-shrinkwrap.json，那么 npm install 会忽略 package.json，按照这个文件中的版本号去安装依赖。如果想根据 package.json 安装依赖，执行如下命令：

```js
npm install --ignore-shrinkwrap
```

三、 依赖包升级

为了使系统保持健壮性、减少依赖包的自身 bug 对系统的影响，应当定期对项目依赖进行升级。由于前端工具包的迭代速度较快，建议升级每三个月进行一次，最长不超过半年，并将升级详情记录到 CHANGELOG 中。
