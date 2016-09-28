## babel 6.9 构建之我忧

最近在做前后端分离，使用了 [React Starter Kit](https://github.com/kriasoft/react-starter-kit/tree/feature/redux) 作为 boilerplate。 这是第二次使用这个样板（以下简称新版 kit），第一次使用是 15 年 12 月（以下简称旧版 kit），那时 redux 还没有从众多 flux 架构实现中脱颖而出，故第一次使用的是基于 flux 的旧版 kit。新版 kit 相比旧版做了一些升级，数据流管理从 flux 升级到 redux，同时各种其他依赖（30 ~ 40 个吧）都做了版本升级，而我之忧也是伴随着升级的快感无情降临的。

### 不作死就不会死

新版 kit 虽然做了很多升级和改进，但其中的某些改进给我的感觉并不好；另外，旧版 kit 实践过程中也做了一些适合自己项目的改变，这也是我不想完全使用新版 kit 的原因之一。于是就着手在旧版 kit 的基础上，升级部分地方以便跟 redux 更好的结合（这一版的 boilerplate以下简称为改进版 kit）。升级的地方主要包括页面入口 app.js 以及在组件中加入 redux 的相关内容。

新版 kit 对 nodejs 的版本要求是 >= 5.0，webpack 为 1.13.1，将 babel 升级到了 6.9。在网上查了一下 nodejs 的信息，5.x 对 es6 的支持不到 50%，而 6.x 的支持已经到了 93% (此时的 node latest 为 6.3.0，下文提到的 node 6 或者 node 6.x 都是这一版本)，于是决定果断跳过 5.x，使用 6.3.0。而 webpack 和 babel 方面，我的了解都不够深入透彻，于是决定先不升级，看看改进版 kit 能否正常工作再说。

于是果断的执行了`npm start`，期待会有一个好的结局。事与愿违，报错终于来了。错误如下：

```
ERROR in ./src/app.js
Module parse failed: d:\path\to\prj\src\app.js Unexpected token (101:8)
You may need an appropriate loader to handle this file type.
SyntaxError: Unexpected token (101:8)
    at Parser.pp.raise (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:923:13)
    at Parser.pp.unexpected (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:1490:8)
    at Parser.pp.parseIdent (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:680:10)
    at Parser.pp.parsePropertyName (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:556:12
7)m ERR! Tell the author that this fails on your system:\js-tokens
    at Parser.pp.parseObj (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:502:10)
    at Parser.pp.parseExprAtom (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:316:19)
    at Parser.pp.parseExprSubscripts (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:228:
19) ERR! Or if that isn't available, you can get their info via:s\node_modules\json5
    at Parser.pp.parseMaybeUnary (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:207:17)
    at Parser.pp.parseExprOps (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:154:19)
    at Parser.pp.parseMaybeConditional (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:13
6:19)RR! Please include the following file with any support request:
    at Parser.pp.parseMaybeAssign (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:112:19)
- source-map@0.1.32 node_modules\babel-loader\node_modules\source-map-support\node_modules\source-map
    at Parser.pp.parseExprList (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:660:23)
    at Parser.pp.parseSubscripts (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:252:29)
    at Parser.pp.parseExprSubscripts (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:231:
15)xuan@1.0.0 d:\path\to\prj
    at Parser.pp.parseMaybeUnary (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:207:17)
    at Parser.pp.parseExprOps (D:\path\to\prj\node_modules\webpack\node_modules\acorn\dist\acorn.js:154:19)
 @ multi applve@1.1.7
```

于是定位到 app.js 的报错行，发现出错的地方是 `object spread` 的语法，但这一块是参照新版 kit 改进的，而新版 kit 运行过，没有任何问题。考虑到上面提到的改变，感觉问题可能出在 node 6 上，安装了 node 5.10.0 再试，而这次更加诡异，控制台没有任何输出，包括错误输出都没有。 这还真是意外的惊喜啊，真的惊到了。这让我怎么找问题，还不如 node 6 有个错误提示呢。于是又切换会了 node 6 环境，从其他地方进行排查。

### bug 天天有，今天特别多

又看了一下错误输出，发现报错的位置都在 webpack 中，虽然觉得应该跟 webpack 没啥关系，但还是尝试着升级一下，结果确实跟 webpack 无关，错误依旧。耐着性子分析了一下 bug 以及改进版 kit 和新版 kit 的不同点，感觉应该是 babel 的问题，执行的命令是 `babel-node tools/run build/start`，有可能是 babel 5 和 node 6 之间不兼容导致的。具体怎么回事不想也没有精力深究，于是果断升级 babel 5.8 到 babel 6.9。

babel 6 做了很大改动，将 babel 5 的设计做了拆分，这是在解决了下面的几个 bug 之后了解到的，下文在展开来说。先看 bug：

```
ReferenceError: [BABEL] D:\path\to\prj\tools\run.js: Using removed Babel 5 option: base.stage - Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets
```

升级 babel 之后，首先遇到了上面的问题，原来是 babel 6 对 .babelrc 的格式做了改变。于是将 .babelrc 的格式参照 新版 kit 的配置做了如下修改：

```json
{
  "presets": [
    "react",
    "es2015",
    "stage-0"
  ]
}
```

bug 再次降临，正应了那句话，bug 天天有，今天特别多(┬＿┬)。

```
D:\path\to\prj\node_modules\webpack\lib\webpack.js:27
                throw new Error("Invalid argument: options");
                ^

Error: Invalid argument: options
    at webpack (D:\path\to\prj\node_modules\webpack\lib\webpack.js:27:9)
    at Object.<anonymous> (start.js:18:17)
    at Module._compile (module.js:541:32)
    at loader (D:\path\to\prj\node_modules\babel-register\lib\node.js:158:5)
    at Object.require.extensions.(anonymous function) [as .js] (D:\path\to\prj\node_modules\babel-register\lib\node.js:168:7)
    at Module.load (module.js:458:32)
    at tryModuleLoad (module.js:417:12)
    at Function.Module._load (module.js:409:3)
    at Module.require (module.js:468:17)
    at require (internal/module.js:20:19)
```

乍一看报错内容，就如丈二和尚一样，摸不着头脑。webpack.config.js 无效？？？在逗我吗？webpack 又没升级，而且也没听说过 webpack 的 config 文件格式有变化啊！！！

无奈之下，不明所以的我只能用最原始的方法，将 start.js 中 require 的 webpack.config.js 打印出来看一下，结果竟然变成 `undefined` 了。什么情况？导入的没错啊，旧版 kit 就是这么搞的，这是几个意思（此时的我也并没有意识到是什么情况）？

```js
const webpackConfig = require('./webpack.config')[0]; 
```

于是就直接打印了 `require('./webpack.config')` ：

```
{ default:
   [ { output: [Object],
       cache: true,
       debug: true,
       stats: [Object],
       plugins: [Object],
       resolve: [Object],
       module: [Object],
       postcss: [Function: postcss],
       entry: [Object],
       ...
```

喔~~，有点明白了。看来是没有自动解析 es6 的 export default 导致的，遂手动加上了，搞定！

### 一波刚平，一波又起

搞定了这个问题，怀着忐忑的心情（ 此时已经被搞的快得心脏病了 ），再一次运行项目。回答我的是一声 **唉~~**

```
[10:47:48] Starting 'undefined'...
TypeError: fn is not a function
    at _callee$ (run.js:17:9)
    at tryCatch (D:\path\to\prj\node_modules\regenerator-runtime\runtime.js:62:40)
    at GeneratorFunctionPrototype.invoke [as _invoke] (D:\path\to\prj\node_modules\regenerator-runtime\runtime.js:336:22)
    at GeneratorFunctionPrototype.prototype.(anonymous function) [as next] (D:\path\to\prj\node_modules\regenerator-runtime\runtime.js:95:21)
    at step (D:\path\to\prj\tools\run.js:41:191)
    at D:\path\to\prj\tools\run.js:41:451
    at new Promise (D:\path\to\prj\node_modules\core-js\modules\es6.promise.js:191:7)
    at D:\path\to\prj\tools\run.js:41:99
    at run (D:\path\to\prj\tools\run.js:35:17)
    at Object.<anonymous> (run.js:26:3)

```

仔细一看，是同样的问题，长吁一口气，搞定后再试（ 我是搞不死的小强 ）。

Yeah~~ 好像正常了，就看控制台逐步打印出了熟悉的正常构建的 log。等等，哎~ 别呀~~

```
Module parse failed: d:\path\to\prj\src\app.js Unexpected token (101:8)
You may need an appropriate loader to handle this file type.
```

我的心都碎了一地，这是要搞死我啊（⊙﹏⊙）。

绕了一圈，最开始的 bug 又回来了。看来不把我逼疯他是不会走的。

于是从头来过，仔细思考了一下，结合在网上查的相关答案，判断可能是 babel 6 不能自动解析 object spread 语法，但是查了一下`babel-preset-stage-0`，发现`babel-preset-stage-2`就开始支持了。分析似乎走到了死胡同，怎么也找不到出去的路了。

无奈之下，左试右试，还是没解决。巧合之下，将 node 切换成了 5.10.0，结果问题就不见了。

这时才意识到，可能还是配置上的问题，看来是新版 kit 的这套配置我哪里没理解透彻就挪到了 node 6 上，导致了各种各样的问题。但是问题还没完呢，在打包编译 server.js 的时候又报了一个错误：

```
Module build failed: SyntaxError: d:/path/to/prj/src/components/LoginPage/LoginPage.js: Decorators are not supported yet in 6.x pending proposal update.
```

看来是 Decorators 在 babel 6 目前的版本中还不支持，查了下官网 [babel-transform-decorators]，发现确实是暂时不支持了，但是有插件可以搞定，只不过需要手动配置，于是这个问题也就这么解决了。不过后来发现`babel-preset-stage-1`中包括了`transform-decorators`，具体怎样这里就不深究了。


最后这套改动在 5.10.0 上成功构建了，内心总算是得到了一点小安慰，没白折腾一回。但内心其实还是有个小小的梗，就是 6.3.0 上的失败问题。目前没有足够精力探究了，留待以后对 babel 和node 了解更深入的时候再解决吧。

### babel 6 初体验

babel 6 做了很大变动，babel npm 包被拆分成 `babel-cli`, `babel-core`, `bebael-polyfill` 三个部分了，并且将所有的 transform 变成插件形式存在，通过配置告诉 babel 要使用哪些插件。具体的使用方法可以看一下这篇介绍 babel 6 的文章： [The Six Things You Need To Know About Babel 6]；另外，[Babel-现在开始使用 ES6] 也会加深你对 babel 的了解

-- EOF --

##### 2016-09-08 续

最近 node 6.4.0 和 6.5.0 也正式发布了，在这两个版本上做了构建实验，发现 5.10.0 上的配置没问题，都构建成功了。然后我就不知道说些什么了，决定去 github 上给 node 提 issue，看看有没有人帮我解答下。经过最近一段时间对 babel 的使用，感觉 babel 6 还是很不错的，推荐 "有条件" 的升级。


[babel-transform-decorators]: http://babeljs.io/docs/plugins/transform-decorators "babel transform decorators"
[Babel-现在开始使用 ES6]: http://greengerong.com/blog/2015/03/22/babel-kai-shi-es6ti-yan/ "Babel-现在开始使用 ES6"
[The Six Things You Need To Know About Babel 6]: http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/ "The Six Things You Need To Know About Babel 6"