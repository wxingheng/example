import path from 'path'
import compression from 'compression'

export default {
  mode: 'unknown',
  srcDir: __dirname,
  server: {
    port: 8000,
    host: '0.0.0.0',
    timing: {
      total: true
    }
  },
  router: {
    base: '/test/',
    middleware: 'noop',
    extendRoutes(routes) {
      return [
        ...routes,
        {
          name: 'about-bis',
          path: '/about-bis',
          component: '~/pages/about.vue',
          meta: { text: 'test-meta' }
        },
        {
          path: '/redirect/about-bis',
          redirect: '/about-bis'
        },
        {
          path: '/not-existed'
        }
      ]
    }
  },
  modulesDir: [path.join(__dirname, '..', '..', '..', 'node_modules')],
  transition: 'test',
  layoutTransition: 'test',
  loadingIndicator: 'circle',
  extensions: 'ts',
  plugins: [
    '~/plugins/test',
    '~/plugins/doubled',
    { src: '~/plugins/test.plugin', mode: 'abc' },
    '~/plugins/test.client',
    '~/plugins/test.server',
    { src: '~/plugins/only-client.js', ssr: false }
  ],
  loading: '~/components/loading',
  env: {
    bool: true,
    num: 23,
    string: 'Nuxt.js',
    object: {
      bool: false,
      string: 'ok',
      num2: 8.23,
      obj: {
        again: true
      }
    }
  },
  build: {
    publicPath: '/orion/',
    cssSourceMap: true,
    parallel: true,
    analyze: {
      analyzerMode: 'disabled',
      generateStatsFile: true,
      logLevel: 'error'
    },
    styleResources: {
      css: './assets/pre-process.css'
    },
    babel: {
      presets({ isServer }) {
        return null // Coverage: Return null, so defaults will be used.
      }
    },
    transpile: 'vue-test',
    extend(config, options) {
      return Object.assign({}, config, {
        devtool: '#source-map'
      })
    }
  },
  css: [{ src: '~/assets/app' }],
  render: {
    csp: true,
    http2: {
      push: true,
      shouldPush: (file, type) => type === 'script'
    },
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    },
    compressor: function damn(...args) { return compression({ threshold: 9 })(...args) },
    static: {
      maxAge: '1y'
    }
  },
  globalName: 'noxxt',
  globals: {
    id: 'custom-nuxt-id'
  }
}
