import chokidar from 'chokidar'
import upath from 'upath'
import debounce from 'lodash/debounce'
import { r, isString } from '@nuxt/utils'

import Builder from '../src/builder'
import { createNuxt } from './__utils__'

jest.mock('chokidar', () => ({
  watch: jest.fn().mockReturnThis(),
  on: jest.fn().mockReturnThis(),
  close: jest.fn().mockReturnThis()
}))
jest.mock('upath', () => ({ normalizeSafe: jest.fn(src => src) }))
jest.mock('lodash/debounce', () => jest.fn(fn => fn))
jest.mock('@nuxt/utils')
jest.mock('../src/ignore')

describe('builder: builder watch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should watch client files', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.build.watch = []

    const builder = new Builder(nuxt, {})
    builder.createFileWatcher = jest.fn()
    builder.assignWatcher = jest.fn(() => () => {})
    r.mockImplementation((dir, src) => src)

    builder.watchClient()

    const patterns = [
      '/var/nuxt/src/layouts',
      '/var/nuxt/src/store',
      '/var/nuxt/src/middleware',
      '/var/nuxt/src/layouts/*.{vue,js,ts,tsx}',
      '/var/nuxt/src/layouts/**/*.{vue,js,ts,tsx}'
    ]

    expect(r).toBeCalledTimes(5)
    expect(r).nthCalledWith(1, '/var/nuxt/src', '/var/nuxt/src/layouts')
    expect(r).nthCalledWith(2, '/var/nuxt/src', '/var/nuxt/src/store')
    expect(r).nthCalledWith(3, '/var/nuxt/src', '/var/nuxt/src/middleware')
    expect(r).nthCalledWith(4, '/var/nuxt/src', '/var/nuxt/src/layouts/*.{vue,js,ts,tsx}')
    expect(r).nthCalledWith(5, '/var/nuxt/src', '/var/nuxt/src/layouts/**/*.{vue,js,ts,tsx}')

    expect(upath.normalizeSafe).toBeCalledTimes(5)
    expect(upath.normalizeSafe).nthCalledWith(1, '/var/nuxt/src/layouts', 0, patterns)
    expect(upath.normalizeSafe).nthCalledWith(2, '/var/nuxt/src/store', 1, patterns)
    expect(upath.normalizeSafe).nthCalledWith(3, '/var/nuxt/src/middleware', 2, patterns)
    expect(upath.normalizeSafe).nthCalledWith(4, '/var/nuxt/src/layouts/*.{vue,js,ts,tsx}', 3, patterns)
    expect(upath.normalizeSafe).nthCalledWith(5, '/var/nuxt/src/layouts/**/*.{vue,js,ts,tsx}', 4, patterns)

    expect(builder.createFileWatcher).toBeCalledTimes(1)
    expect(builder.createFileWatcher).toBeCalledWith(patterns, ['add', 'unlink'], expect.any(Function), expect.any(Function))
    expect(builder.assignWatcher).toBeCalledTimes(1)
  })

  test('should watch pages files', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.build.watch = []
    nuxt.options.watchers = {
      chokidar: { test: true }
    }

    const builder = new Builder(nuxt, {})
    builder._nuxtPages = true
    r.mockImplementation((dir, src) => src)

    builder.watchClient()

    expect(r).toBeCalledTimes(8)
    expect(r).nthCalledWith(6, '/var/nuxt/src', '/var/nuxt/src/pages')
    expect(r).nthCalledWith(7, '/var/nuxt/src', '/var/nuxt/src/pages/*.{vue,js,ts,tsx}')
    expect(r).nthCalledWith(8, '/var/nuxt/src', '/var/nuxt/src/pages/**/*.{vue,js,ts,tsx}')
  })

  test('should invoke generateRoutesAndFiles on file refresh', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.build.watch = []
    nuxt.options.watchers = {
      chokidar: { test: true }
    }
    const builder = new Builder(nuxt, {})
    builder.watchCustom = jest.fn()
    r.mockImplementation((dir, src) => src)

    builder.watchClient()

    expect(debounce).toBeCalledTimes(1)
    expect(debounce).toBeCalledWith(expect.any(Function), 200)

    const refreshFiles = chokidar.on.mock.calls[0][1]
    builder.generateRoutesAndFiles = jest.fn()
    refreshFiles()
    expect(builder.generateRoutesAndFiles).toBeCalled()
  })

  test('should watch custom patterns', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.build.watch = [
      '/var/nuxt/src/custom'
    ]
    nuxt.options.build.styleResources = [
      '/var/nuxt/src/style'
    ]
    const builder = new Builder(nuxt, {})
    builder.createFileWatcher = jest.fn()
    builder.assignWatcher = jest.fn(() => () => {})
    builder.watchClient()

    const patterns = [
      '/var/nuxt/src/custom',
      '/var/nuxt/src/style'
    ]

    expect(builder.createFileWatcher).toBeCalledTimes(2)
    expect(builder.createFileWatcher).toBeCalledWith(patterns, ['change'], expect.any(Function), expect.any(Function))
    expect(builder.assignWatcher).toBeCalledTimes(2)
  })

  test('should invoke chokidar to create watcher', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.watchers = {
      chokidar: { test: true }
    }

    const patterns = ['/patterns']
    const events = ['event', 'another event']
    const listener = jest.fn()
    const watcherCreatedCallback = jest.fn()

    const builder = new Builder(nuxt, {})
    builder.createFileWatcher(patterns, events, listener, watcherCreatedCallback)

    expect(chokidar.watch).toBeCalledTimes(1)
    expect(chokidar.watch).toBeCalledWith(patterns, { test: true })
    expect(chokidar.on).toBeCalledTimes(2)
    expect(chokidar.on).nthCalledWith(1, 'event', listener)
    expect(chokidar.on).nthCalledWith(2, 'another event', listener)
    expect(watcherCreatedCallback).toBeCalledTimes(1)
  })

  test('should restart watcher when event is included in rewatchOnRawEvents', () => {
    const nuxt = createNuxt()
    nuxt.options.srcDir = '/var/nuxt/src'
    nuxt.options.dir = {
      layouts: '/var/nuxt/src/layouts',
      pages: '/var/nuxt/src/pages',
      store: '/var/nuxt/src/store',
      middleware: '/var/nuxt/src/middleware'
    }
    nuxt.options.watchers = {
      chokidar: { test: true },
      rewatchOnRawEvents: ['rename']
    }

    const patterns = ['/pattern']
    const events = ['event']
    const listener = jest.fn()
    const watcherCreatedCallback = jest.fn()

    const builder = new Builder(nuxt, {})
    builder.createFileWatcher(patterns, events, listener, watcherCreatedCallback)

    expect(chokidar.on).toBeCalledTimes(2)
    expect(chokidar.on).nthCalledWith(2, 'raw', expect.any(Function))

    const rewatchHandler = chokidar.on.mock.calls[1][1]
    rewatchHandler('rename')
    rewatchHandler('change')

    expect(chokidar.close).toBeCalledTimes(1)
    expect(builder.watchers.custom).toBeNull()
    expect(watcherCreatedCallback).toBeCalledTimes(2)
  })

  test('should watch files for restarting server', () => {
    const nuxt = createNuxt()
    nuxt.options.watchers = {
      chokidar: { test: true }
    }
    nuxt.options.watch = [
      '/var/nuxt/src/watch/test'
    ]
    nuxt.options.serverMiddleware = [
      '/var/nuxt/src/middleware/test',
      { obj: 'test' }
    ]
    const builder = new Builder(nuxt, {})
    builder.ignore.ignoreFile = '/var/nuxt/src/.nuxtignore'
    isString.mockImplementationOnce(src => typeof src === 'string')

    builder.watchRestart()

    expect(chokidar.watch).toBeCalledTimes(1)
    expect(chokidar.watch).toBeCalledWith(
      [
        'resolveAlias(/var/nuxt/src/middleware/test)',
        'resolveAlias(/var/nuxt/src/watch/test)',
        '/var/nuxt/src/.nuxtignore'
      ],
      { test: true }
    )
    expect(chokidar.on).toBeCalledTimes(1)
    expect(chokidar.on).toBeCalledWith('all', expect.any(Function))
  })

  test('should trigger restarting when files changed', () => {
    const nuxt = createNuxt()
    nuxt.options.watchers = {
      chokidar: { test: true }
    }
    nuxt.options.watch = [
      '/var/nuxt/src/watch/test'
    ]
    nuxt.options.serverMiddleware = []
    const builder = new Builder(nuxt, {})

    builder.watchRestart()

    const restartHandler = chokidar.on.mock.calls[0][1]
    const watchingFile = '/var/nuxt/src/watch/test/index.js'
    restartHandler('add', watchingFile)
    restartHandler('change', watchingFile)
    restartHandler('unlink', watchingFile)

    expect(nuxt.callHook).toBeCalledTimes(6)
    expect(nuxt.callHook).nthCalledWith(1, 'watch:fileChanged', builder, watchingFile)
    expect(nuxt.callHook).nthCalledWith(2, 'watch:restart', { event: 'add', path: watchingFile })
    expect(nuxt.callHook).nthCalledWith(3, 'watch:fileChanged', builder, watchingFile)
    expect(nuxt.callHook).nthCalledWith(4, 'watch:restart', { event: 'change', path: watchingFile })
    expect(nuxt.callHook).nthCalledWith(5, 'watch:fileChanged', builder, watchingFile)
    expect(nuxt.callHook).nthCalledWith(6, 'watch:restart', { event: 'unlink', path: watchingFile })
  })

  test('should ignore other events in watchRestart', () => {
    const nuxt = createNuxt()
    nuxt.options.watchers = {
      chokidar: { test: true }
    }
    nuxt.options.watch = [
      '/var/nuxt/src/watch/test'
    ]
    nuxt.options.serverMiddleware = []
    const builder = new Builder(nuxt, {})

    builder.watchRestart()

    const restartHandler = chokidar.on.mock.calls[0][1]
    const watchingFile = '/var/nuxt/src/watch/test/index.js'
    restartHandler('rename', watchingFile)

    expect(nuxt.callHook).not.toBeCalled()
  })

  test('should unwatch every watcher', () => {
    const nuxt = createNuxt()
    const builder = new Builder(nuxt, {})
    builder.watchers = {
      files: { close: jest.fn() },
      custom: { close: jest.fn() },
      restart: { close: jest.fn() }
    }

    builder.unwatch()

    expect(builder.watchers.files.close).toBeCalledTimes(1)
    expect(builder.watchers.custom.close).toBeCalledTimes(1)
    expect(builder.watchers.restart.close).toBeCalledTimes(1)
  })

  test('should close watch and bundle builder', async () => {
    const nuxt = createNuxt()
    const bundleBuilderClose = jest.fn()
    const builder = new Builder(nuxt, { close: bundleBuilderClose })
    builder.unwatch = jest.fn()

    expect(builder.__closed).toBeUndefined()

    await builder.close()

    expect(builder.__closed).toEqual(true)
    expect(builder.unwatch).toBeCalledTimes(1)
    expect(bundleBuilderClose).toBeCalledTimes(1)
  })

  test('should close bundleBuilder only if close api exists', async () => {
    const nuxt = createNuxt()
    const builder = new Builder(nuxt, { })
    builder.unwatch = jest.fn()

    expect(builder.__closed).toBeUndefined()

    await builder.close()

    expect(builder.__closed).toEqual(true)
    expect(builder.unwatch).toBeCalledTimes(1)
  })

  test('should prevent duplicate close', async () => {
    const nuxt = createNuxt()
    const bundleBuilderClose = jest.fn()
    const builder = new Builder(nuxt, { close: bundleBuilderClose })
    builder.unwatch = jest.fn()
    builder.__closed = true

    await builder.close()

    expect(builder.unwatch).not.toBeCalled()
    expect(bundleBuilderClose).not.toBeCalled()
  })

  test('should assign watcher with key', () => {
    const nuxt = createNuxt()
    const builder = new Builder(nuxt, {})

    const key = 'key'
    const watcher = 'watcher'

    const fn = builder.assignWatcher(key)
    fn(watcher)

    expect(Boolean(builder.watchers[key])).toBe(true)
    expect(builder.watchers[key]).toBe(watcher)
  })
})
