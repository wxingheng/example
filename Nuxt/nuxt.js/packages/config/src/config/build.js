import env from 'std-env'

export default () => ({
  quiet: Boolean(env.ci || env.test),
  analyze: false,
  profile: process.argv.includes('--profile'),
  extractCSS: false,
  crossorigin: undefined,
  cssSourceMap: undefined,
  ssr: undefined,
  parallel: false,
  cache: false,
  standalone: false,
  publicPath: '/_nuxt/',
  filenames: {
    // { isDev, isClient, isServer }
    app: ({ isDev, isModern }) => isDev ? `${isModern ? 'modern-' : ''}[name].js` : '[chunkhash].js',
    chunk: ({ isDev, isModern }) => isDev ? `${isModern ? 'modern-' : ''}[name].js` : '[chunkhash].js',
    css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
    img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
    font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
    video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'
  },
  loaders: {
    file: {},
    fontUrl: { limit: 1000 },
    imgUrl: { limit: 1000 },
    pugPlain: {},
    vue: {
      transformAssetUrls: {
        video: 'src',
        source: 'src',
        object: 'src',
        embed: 'src'
      }
    },
    css: {},
    cssModules: {
      localIdentName: '[local]_[hash:base64:5]'
    },
    less: {},
    sass: {
      indentedSyntax: true
    },
    scss: {},
    stylus: {},
    ts: {
      transpileOnly: true,
      appendTsSuffixTo: [/\.vue$/]
    },
    tsx: {
      transpileOnly: true,
      appendTsxSuffixTo: [/\.vue$/]
    },
    vueStyle: {}
  },
  typescript: {
    typeCheck: true
  },
  styleResources: {},
  plugins: [],
  terser: {},
  hardSource: false,
  optimizeCSS: undefined,
  optimization: {
    runtimeChunk: 'single',
    minimize: undefined,
    minimizer: undefined,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: undefined,
      cacheGroups: {}
    }
  },
  splitChunks: {
    layouts: false,
    pages: true,
    commons: true
  },
  babel: {
    babelrc: false,
    cacheDirectory: undefined
  },
  transpile: [], // Name of NPM packages to be transpiled
  postcss: {
    preset: {
      // https://cssdb.org/#staging-process
      stage: 2
    }
  },
  html: {
    minify: {
      collapseBooleanAttributes: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },

  template: undefined,
  templates: [],

  watch: [],
  devMiddleware: {},
  hotMiddleware: {},

  stats: {
    excludeAssets: [
      /.map$/,
      /index\..+\.html$/,
      /vue-ssr-(client|modern)-manifest.json/
    ]
  },
  friendlyErrors: true
})
