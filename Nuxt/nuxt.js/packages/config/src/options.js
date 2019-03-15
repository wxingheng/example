import path from 'path'
import fs from 'fs'
import defaultsDeep from 'lodash/defaultsDeep'
import defaults from 'lodash/defaults'
import pick from 'lodash/pick'
import isObject from 'lodash/isObject'
import uniq from 'lodash/uniq'
import consola from 'consola'
import { guardDir, isNonEmptyString, isPureObject, isUrl, getMainModule } from '@nuxt/utils'
import { defaultNuxtConfigFile, getDefaultNuxtConfig } from './config'

export function getNuxtConfig(_options) {
  // Prevent duplicate calls
  if (_options.__normalized__) {
    return _options
  }

  // Clone options to prevent unwanted side-effects
  const options = Object.assign({}, _options)
  options.__normalized__ = true

  // Normalize options
  if (options.loading === true) {
    delete options.loading
  }
  if (
    options.router &&
    options.router.middleware &&
    !Array.isArray(options.router.middleware)
  ) {
    options.router.middleware = [options.router.middleware]
  }
  if (options.router && typeof options.router.base === 'string') {
    options._routerBaseSpecified = true
  }
  if (typeof options.transition === 'string') {
    options.transition = { name: options.transition }
  }
  if (typeof options.layoutTransition === 'string') {
    options.layoutTransition = { name: options.layoutTransition }
  }
  if (typeof options.extensions === 'string') {
    options.extensions = [options.extensions]
  }

  options.globalName = (isNonEmptyString(options.globalName) && /^[a-zA-Z]+$/.test(options.globalName))
    ? options.globalName.toLowerCase()
    : `nuxt`

  // Resolve rootDir
  options.rootDir = isNonEmptyString(options.rootDir) ? path.resolve(options.rootDir) : process.cwd()

  // Apply defaults by ${buildDir}/dist/build.config.js
  // TODO: Unsafe operation.
  // const buildDir = options.buildDir || defaults.buildDir
  // const buildConfig = resolve(options.rootDir, buildDir, 'build.config.js')
  // if (existsSync(buildConfig)) {
  //   defaultsDeep(options, require(buildConfig))
  // }

  // Apply defaults
  const nuxtConfig = getDefaultNuxtConfig()

  nuxtConfig.build._publicPath = nuxtConfig.build.publicPath

  // Fall back to default if publicPath is falsy
  if (options.build && !options.build.publicPath) {
    options.build.publicPath = undefined
  }

  defaultsDeep(options, nuxtConfig)

  // Check srcDir and generate.dir existence
  const hasSrcDir = isNonEmptyString(options.srcDir)
  const hasGenerateDir = isNonEmptyString(options.generate.dir)

  // Resolve srcDir
  options.srcDir = hasSrcDir
    ? path.resolve(options.rootDir, options.srcDir)
    : options.rootDir

  // Resolve buildDir
  options.buildDir = path.resolve(options.rootDir, options.buildDir)

  // Default value for _nuxtConfigFile
  if (!options._nuxtConfigFile) {
    options._nuxtConfigFile = path.resolve(options.rootDir, `${defaultNuxtConfigFile}.js`)
  }

  // Watch for _nuxtConfigFile changes
  options.watch.push(options._nuxtConfigFile)

  // Protect rootDir against buildDir
  guardDir(options, 'rootDir', 'buildDir')

  if (hasGenerateDir) {
    // Resolve generate.dir
    options.generate.dir = path.resolve(options.rootDir, options.generate.dir)

    // Protect rootDir against buildDir
    guardDir(options, 'rootDir', 'generate.dir')
  }

  if (hasSrcDir) {
    // Protect srcDir against buildDir
    guardDir(options, 'srcDir', 'buildDir')

    if (hasGenerateDir) {
      // Protect srcDir against generate.dir
      guardDir(options, 'srcDir', 'generate.dir')
    }
  }

  // Populate modulesDir
  options.modulesDir = uniq(
    getMainModule().paths.concat(
      [].concat(options.modulesDir).map(dir => path.resolve(options.rootDir, dir))
    )
  )

  const mandatoryExtensions = ['js', 'mjs', 'ts']

  options.extensions = mandatoryExtensions
    .filter(ext => !options.extensions.includes(ext))
    .concat(options.extensions)

  // If app.html is defined, set the template path to the user template
  if (options.appTemplatePath === undefined) {
    options.appTemplatePath = path.resolve(options.buildDir, 'views/app.template.html')
    if (fs.existsSync(path.join(options.srcDir, 'app.html'))) {
      options.appTemplatePath = path.join(options.srcDir, 'app.html')
    }
  } else {
    options.appTemplatePath = path.resolve(options.srcDir, options.appTemplatePath)
  }

  options.build.publicPath = options.build.publicPath.replace(/([^/])$/, '$1/')
  options.build._publicPath = options.build._publicPath.replace(/([^/])$/, '$1/')

  // Ignore publicPath on dev
  if (options.dev && isUrl(options.build.publicPath)) {
    options.build.publicPath = options.build._publicPath
  }

  // If store defined, update store options to true unless explicitly disabled
  if (
    options.store !== false &&
    fs.existsSync(path.join(options.srcDir, options.dir.store)) &&
    fs.readdirSync(path.join(options.srcDir, options.dir.store))
      .find(filename => filename !== 'README.md' && filename[0] !== '.')
  ) {
    options.store = true
  }

  // SPA loadingIndicator
  if (options.loadingIndicator) {
    // Normalize loadingIndicator
    if (!isPureObject(options.loadingIndicator)) {
      options.loadingIndicator = { name: options.loadingIndicator }
    }

    // Apply defaults
    options.loadingIndicator = Object.assign(
      {
        name: 'default',
        color: (options.loading && options.loading.color) || '#D3D3D3',
        color2: '#F5F5F5',
        background: (options.manifest && options.manifest.theme_color) || 'white',
        dev: options.dev,
        loading: options.messages.loading
      },
      options.loadingIndicator
    )
  }

  // Debug errors
  if (options.debug === undefined) {
    options.debug = options.dev
  }

  // Apply default hash to CSP option
  const { csp } = options.render

  const cspDefaults = {
    hashAlgorithm: 'sha256',
    allowedSources: undefined,
    policies: undefined,
    reportOnly: options.debug
  }
  if (csp) {
    options.render.csp = defaults(isObject(csp) ? csp : {}, cspDefaults)
  }

  // cssSourceMap
  if (options.build.cssSourceMap === undefined) {
    options.build.cssSourceMap = options.dev
  }

  const babelConfig = options.build.babel
  // babel cacheDirectory
  if (babelConfig.cacheDirectory === undefined) {
    babelConfig.cacheDirectory = options.dev
  }

  // TODO: remove this warn in Nuxt 3
  if (Array.isArray(babelConfig.presets)) {
    const warnPreset = (presetName) => {
      const oldPreset = '@nuxtjs/babel-preset-app'
      const newPreset = '@nuxt/babel-preset-app'
      if (presetName.includes(oldPreset)) {
        presetName = presetName.replace(oldPreset, newPreset)
        consola.warn('@nuxtjs/babel-preset-app has been deprecated, please use @nuxt/babel-preset-app.')
      }
      return presetName
    }
    babelConfig.presets = babelConfig.presets.map((preset) => {
      const hasOptions = Array.isArray(preset)
      if (hasOptions) {
        preset[0] = warnPreset(preset[0])
      } else if (typeof preset === 'string') {
        preset = warnPreset(preset)
      }
      return preset
    })
  }

  // vue config
  const vueConfig = options.vue.config

  if (vueConfig.silent === undefined) {
    vueConfig.silent = !options.dev
  }
  if (vueConfig.performance === undefined) {
    vueConfig.performance = options.dev
  }

  // merge custom env with variables
  const eligibleEnvVariables = pick(process.env, Object.keys(process.env).filter(k => k.startsWith('NUXT_ENV_')))
  Object.assign(options.env, eligibleEnvVariables)

  // Normalize ignore
  options.ignore = options.ignore ? [].concat(options.ignore) : []

  // Append ignorePrefix glob to ignore
  if (typeof options.ignorePrefix === 'string') {
    options.ignore.push(`**/${options.ignorePrefix}*.*`)
  }

  // Compression middleware legacy
  if (options.render.gzip) {
    consola.warn('render.gzip is deprecated and will be removed in a future version! Please switch to render.compressor')
    options.render.compressor = options.render.gzip
    delete options.render.gzip
  }

  // Apply mode preset
  const modePreset = options.modes[options.mode || 'universal']

  if (!modePreset) {
    consola.warn(`Unknown mode: ${options.mode}. Falling back to universal`)
  }
  defaultsDeep(options, modePreset || options.modes.universal)

  // If no server-side rendering, add appear true transition
  if (options.render.ssr === false && options.transition) {
    options.transition.appear = true
  }

  // We assume the SPA fallback path is 404.html (for GitHub Pages, Surge, etc.)
  if (options.generate.fallback === true) {
    options.generate.fallback = '404.html'
  }

  if (options.build.stats === 'none' || options.build.quiet === true) {
    options.build.stats = false
  }

  // Vendor backward compatibility with nuxt 1.x
  if (typeof options.build.vendor !== 'undefined') {
    delete options.build.vendor
    consola.warn('vendor has been deprecated due to webpack4 optimization')
  }

  // Disable CSS extraction due to incompatibility with thread-loader
  if (options.build.extractCSS && options.build.parallel) {
    options.build.parallel = false
    consola.warn('extractCSS cannot work with parallel build due to limited work pool in thread-loader')
  }

  // build.extractCSS.allChunks has no effect
  if (typeof options.build.extractCSS.allChunks !== 'undefined') {
    consola.warn('build.extractCSS.allChunks has no effect from v2.0.0. Please use build.optimization.splitChunks settings instead.')
  }

  // Enable minimize for production builds
  if (options.build.optimization.minimize === undefined) {
    options.build.optimization.minimize = !options.dev
  }

  // Enable optimizeCSS only when extractCSS is enabled
  if (options.build.optimizeCSS === undefined) {
    options.build.optimizeCSS = options.build.extractCSS ? {} : false
  }

  const { loaders } = options.build
  const vueLoader = loaders.vue
  if (vueLoader.productionMode === undefined) {
    vueLoader.productionMode = !options.dev
  }
  const styleLoaders = [
    'css', 'cssModules', 'less',
    'sass', 'scss', 'stylus', 'vueStyle'
  ]
  for (const name of styleLoaders) {
    const loader = loaders[name]
    if (loader && loader.sourceMap === undefined) {
      loader.sourceMap = Boolean(options.build.cssSourceMap)
    }
  }

  options.build.transpile = [].concat(options.build.transpile || [])

  if (options.build.quiet === true) {
    consola.level = 0
  }

  // Use runInNewContext for dev mode by default
  const { bundleRenderer } = options.render
  if (typeof bundleRenderer.runInNewContext === 'undefined') {
    bundleRenderer.runInNewContext = options.dev
  }

  return options
}
