const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

// 使用本文的主角 AutoWebPlugin，自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin('./src/pages', {
    template: './src/template.html', // HTML 模版文件所在的文件路径
    postEntrys: ['./src/common.css'],// 所有页面都依赖这份通用的 CSS 样式文件
    // 提取出所有页面公共的代码
    commonsChunk: {
        name: 'common',// 提取出公共代码 Chunk 的名称
    },
});


module.exports = {
    // context 默认为执行启动 Webpack 时所在的当前工作目录。
    // context: path.resolve(__dirname, 'src'),
    // JavaScript 执行入口文件
    // entry: './main',
    // AutoWebPlugin 会为寻找到的所有单页应用，生成对应的入口配置，
    // autoWebPlugin.entry 方法可以获取到所有由 autoWebPlugin 生成的入口配置
    entry: autoWebPlugin.entry({                                                                    
        // 这里可以加入你额外需要的 Chunk 入口
    }),
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: '[name].js',// 给输出的文件名称加上 Hash 值
        // 把输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
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
        ]
    },
    plugins: [
        autoWebPlugin,
        new ExtractTextPlugin({
            filename: `[name].css`,// 给输出的 CSS 文件名称加上 Hash 值
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