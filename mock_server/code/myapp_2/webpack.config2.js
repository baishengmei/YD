var path = require("path");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = {
    // 项目入口
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',//资源服务器地址
        'webpack/hot/only-dev-server',
        './src/pages/app.js'
    ],
    // entry: "./src/pages/app.js",
    // 打包文件输出路径
    output: {
        publicPath: "http://127.0.0.1:3000/public/js/",
        path: path.join(__dirname, './public/js'),
        filename: "bundle.js"
    },
    // output: {
    //     path: path.join(__dirname, "./public/js"),
    //     filename: "bundle.js"
    // },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            query: {
                cacheDirectory: true,
                presets: ['react', 'es2015'],
                plugins: [
                    ['import', { libraryName: 'antd', style: 'css' }]
                ]
            },
            exclude:path.resolve(__dirname,'node_modules')
        }, {
            test: /\.jsx$/,
            loader: ['react-hot', 'jsx?harmony', 'babel-loader'],
            query: {
                presets: ['react', 'es2015']
            },
            exclude:path.resolve(__dirname,'node_modules'),
            include: path.join(__dirname, 'src')
        },  {
            test: /\.css$/,
            loader: ["style-loader","css-loader"],
            include:path.resolve(__dirname, 'node_modules/antd')
        },  {
            test: /\.(jpg|png|otf)$/,
            loader: "url-loader?limit=8192"
        }, {
            test: /\.scss$/,
            loaders: ["style-loader","css-loader","sass-loader"],
            exclude:path.resolve(__dirname,'node_modules')
        }, {
            test: /\.less$/,
            loader: ["file-loader", "style-loader", "css-loader", "sass-loader"]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
        
};