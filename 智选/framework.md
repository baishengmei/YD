### React + Redux

```
            .---------------------------------------------------.
            |                                                   |
component --|--> action -> middleware -> reducer -> state --\   |
    |       |                                               |   |
    `───────|─────────────────  <<<  ───────────────────────`   |
    |       |                                                   |
    |       |                                                   |
    |       \ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ /
    |                              |
  React                          Redux
```

### Redux Component

```
                          Redux Component
                                |
                              /   \
                            /       \
                          /           \
                     container     component
                     (容器组件)     (普通组件)
```

### webpack + npm

```
                                               Web Scaffold
                                                     .
                                                  /     \
                                              /             \
                                          /                     \
                                      /                             \
                                  /                                     \
                             Webpack                                  NPM/tools
                               |                                         |   \
         ______________________|_____________________                    |     \
        |                      |                     |                 mkdir   test
        |                      |                     |                 clean
    scss/css(postcss)         js                 devtools              copy
        .                      .                     .                replace
       / \                    / \                   / \                watch
     /     \                /     \               /     \
 precss  css module    bundle  es6 to es5  source map  middleware
                        |             |                    |
         browser/node --|           babel              dev server
               _________|_            |                hot replace
              |           |         react
           resolve      plugin      stage
           external       |       es2015/node5/6
                        define
                        assets
                     common chunk
                        uglify
                     banner comment
```

