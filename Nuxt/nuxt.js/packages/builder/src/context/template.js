import hash from 'hash-sum'
import consola from 'consola'
import uniqBy from 'lodash/uniqBy'
import serialize from 'serialize-javascript'

import devalue from '@nuxt/devalue'
import { r, wp, wChunk, serializeFunction } from '@nuxt/utils'

export default class TemplateContext {
  constructor(builder, options) {
    this.templateFiles = Array.from(builder.template.files)
    this.templateVars = {
      options: options,
      extensions: options.extensions
        .map(ext => ext.replace(/^\./, ''))
        .join('|'),
      messages: options.messages,
      splitChunks: options.build.splitChunks,
      uniqBy,
      isDev: options.dev,
      isTest: options.test,
      debug: options.debug,
      vue: { config: options.vue.config },
      fetch: options.fetch,
      mode: options.mode,
      router: options.router,
      env: options.env,
      head: options.head,
      store: options.store,
      globalName: options.globalName,
      globals: builder.globals,
      css: options.css,
      plugins: builder.plugins,
      appPath: './App.js',
      layouts: Object.assign({}, options.layouts),
      loading:
        typeof options.loading === 'string'
          ? builder.relativeToBuild(options.srcDir, options.loading)
          : options.loading,
      transition: options.transition,
      layoutTransition: options.layoutTransition,
      dir: options.dir,
      components: {
        ErrorPage: options.ErrorPage
          ? builder.relativeToBuild(options.ErrorPage)
          : null
      }
    }
  }

  get templateOptions() {
    let lodash = null

    return {
      imports: {
        serialize,
        serializeFunction,
        devalue,
        hash,
        r,
        wp,
        wChunk,
        // Legacy support: https://github.com/nuxt/nuxt.js/issues/4350
        _: new Proxy({}, {
          get(target, prop) {
            if (!lodash) {
              consola.warn('Avoid using _ inside templates')
              lodash = require('lodash')
            }
            return lodash[prop]
          }
        })
      },
      interpolate: /<%=([\s\S]+?)%>/g
    }
  }
}
