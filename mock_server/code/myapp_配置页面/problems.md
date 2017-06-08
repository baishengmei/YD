# 本文记录开发过程中遇到的各种问题

1. 'here are multiple modules with names that only differ in casing' 问题
    + 这个问题产生的原因是 import 模块的时候，写错了模块的大小写，虽然最后也打包成功了，但是后续修改该模块的内容时，webpack 不会重新编译，也就没有 hmr 了。
    + 教训：控制台报错了，或者 warning，赶紧解决，否则后患无穷。
1. flex 布局中 position:absolute/fixed 比较特别，不属于 flex items
1. ReactDOM.renderToString & renderToStatickMarkup 的区别