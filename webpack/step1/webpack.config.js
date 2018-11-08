const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // context 默认为执行启动 Webpack 时所在的当前工作目录。
    context: path.resolve(__dirname, 'src'),
    // JavaScript 执行入口文件
    entry: './main',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 把输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        // 先尝试 ts 后缀的 TypeScript 源码文件
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // 转换 .css 文件需要使用的 Loader
                    use: ['css-loader'],
                }),
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                // 增加对 SCSS 文件的支持
                test: /\.scss/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
                use: ['style-loader', 'css-loader', 'sass-loader'],
              },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            // 从 .js 文件中提取出来的 .css 文件的名称
            filename: `[name].css`,
        }),
    ],
    // 该配置项专只有   webpack-dev-server   才有效
    devServer: {
        https: true
    },
    devtool: 'source-map',
    watch: true
};