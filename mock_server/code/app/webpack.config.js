var path = require("path");
var webpack = require('webpack');

module.exports={
	//项目入口
	entry: "./src/pages/app.js",
	//打包文件输出路径
	output: {
		path: path.join(__dirname, "./public/javascripts"),
		filename: "bundle.js",
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: "babel-loader",
			query: {
				presets: ['es2015', "react"]
			}
		},{
			test: /\.jsx$/,
			loader: "babel-loader",
			query: {
				presets: ['react', 'es2015']
			}
		},{
			test: /\.css$/,
			loader:"style!css"
		},{
			test:/\.scss$/,
			loader: "style!css!sass"
		}]
	}
};