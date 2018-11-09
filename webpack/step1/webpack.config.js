const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { WebPlugin } = require('web-webpack-plugin');


module.exports = {
    // context 默认为执行启动 Webpack 时所在的当前工作目录。
    context: path.resolve(__dirname, 'src'),
    // JavaScript 执行入口文件
    entry: './main',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: '[name].js',// 给输出的文件名称加上 Hash 值
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
                test: /\.css/,// 增加对 CSS 文件的支持
                // 提取出 Chunk 中的 CSS 代码到单独的文件中
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize'] // 压缩 CSS 代码
                }),
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 排除 node_modules 目录下的文件，
                // 该目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                // 增加对 SCSS 文件的支持
                test: /\.scss/,
                // SCSS 文件的处理顺序为先 sass-loader 再 css-loader 再 style-loader
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        // 使用本文的主角 WebPlugin，一个 WebPlugin 对应一个 HTML 文件
        new WebPlugin({
            template: './template.html', // HTML 模版文件所在的文件路径
            filename: 'index.html' // 输出的 HTML 的文件名称
        }),
        new ExtractTextPlugin({
            filename: `[name]_[contenthash:8].css`,// 给输出的 CSS 文件名称加上 Hash 值
        }),
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
    ],
    // 该配置项专只有   webpack-dev-server   才有效
    devServer: {
        https: true
    },
    devtool: 'source-map',
    watch: true
};