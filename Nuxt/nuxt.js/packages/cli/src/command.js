
import path from 'path'
import consola from 'consola'
import minimist from 'minimist'
import { name, version } from '../package.json'
import { loadNuxtConfig, forceExit } from './utils'
import { indent, foldLines, colorize } from './utils/formatting'
import { startSpaces, optionSpaces, forceExitTimeout } from './utils/constants'
import { detectAndSetupTypeScriptSupport } from './utils/typescript'
import * as imports from './imports'

export default class NuxtCommand {
  constructor(cmd = { name: '', usage: '', description: '' }, argv = process.argv.slice(2)) {
    if (!cmd.options) {
      cmd.options = {}
    }
    this.cmd = cmd

    this._argv = Array.from(argv)
    this._parsedArgv = null // Lazy evaluate
  }

  static run(cmd, argv) {
    return NuxtCommand.from(cmd, argv).run()
  }

  static from(cmd, argv) {
    if (cmd instanceof NuxtCommand) {
      return cmd
    }
    return new NuxtCommand(cmd, argv)
  }

  run() {
    if (this.argv.help) {
      this.showHelp()
      return Promise.resolve()
    }

    if (this.argv.version) {
      this.showVersion()
      return Promise.resolve()
    }

    if (typeof this.cmd.run !== 'function') {
      return Promise.resolve()
    }

    const runResolve = Promise.resolve(this.cmd.run(this))

    if (this.argv.lock) {
      runResolve.then(() => this.releaseLock())
    }

    if (this.argv['force-exit']) {
      const forceExitByUser = this.isUserSuppliedArg('force-exit')
      runResolve.then(() => forceExit(this.cmd.name, forceExitByUser ? false : forceExitTimeout))
    }

    return runResolve
  }

  showVersion() {
    process.stdout.write(`${name} v${version}\n`)
  }

  showHelp() {
    process.stdout.write(this._getHelp())
  }

  get argv() {
    if (!this._parsedArgv) {
      const minimistOptions = this._getMinimistOptions()
      this._parsedArgv = minimist(this._argv, minimistOptions)
    }
    return this._parsedArgv
  }

  async getNuxtConfig(extraOptions = {}) {
    const rootDir = path.resolve(this.argv._[0] || '.')
    extraOptions._typescript = await detectAndSetupTypeScriptSupport(rootDir, { transpileOnly: this.cmd.name === 'start' })

    const config = await loadNuxtConfig(this.argv)
    const options = Object.assign(config, extraOptions)

    for (const name of Object.keys(this.cmd.options)) {
      this.cmd.options[name].prepare && this.cmd.options[name].prepare(this, options, this.argv)
    }

    return options
  }

  async getNuxt(options) {
    const { Nuxt } = await imports.core()

    const nuxt = new Nuxt(options)
    await nuxt.ready()

    return nuxt
  }

  async getBuilder(nuxt) {
    const { Builder } = await imports.builder()
    const { BundleBuilder } = await imports.webpack()
    return new Builder(nuxt, BundleBuilder)
  }

  async getGenerator(nuxt) {
    const { Generator } = await imports.generator()
    const builder = await this.getBuilder(nuxt)
    return new Generator(nuxt, builder)
  }

  async setLock(lockRelease) {
    if (lockRelease) {
      if (this._lockRelease) {
        consola.warn(`A previous unreleased lock was found, this shouldn't happen and is probably an error in 'nuxt ${this.cmd.name}' command. The lock will be removed but be aware of potential strange results`)

        await this.releaseLock()
        this._lockRelease = lockRelease
      } else {
        this._lockRelease = lockRelease
      }
    }
  }

  async releaseLock() {
    if (this._lockRelease) {
      await this._lockRelease()
      this._lockRelease = undefined
    }
  }

  isUserSuppliedArg(option) {
    return this._argv.includes(`--${option}`) || this._argv.includes(`--no-${option}`)
  }

  _getDefaultOptionValue(option) {
    return typeof option.default === 'function' ? option.default(this.cmd) : option.default
  }

  _getMinimistOptions() {
    const minimistOptions = {
      alias: {},
      boolean: [],
      string: [],
      default: {}
    }

    for (const name of Object.keys(this.cmd.options)) {
      const option = this.cmd.options[name]

      if (option.alias) {
        minimistOptions.alias[option.alias] = name
      }
      if (option.type) {
        minimistOptions[option.type].push(option.alias || name)
      }
      if (option.default) {
        minimistOptions.default[option.alias || name] = this._getDefaultOptionValue(option)
      }
    }

    return minimistOptions
  }

  _getHelp() {
    const options = []
    let maxOptionLength = 0

    for (const name in this.cmd.options) {
      const option = this.cmd.options[name]

      let optionHelp = '--'
      optionHelp += option.type === 'boolean' && this._getDefaultOptionValue(option) ? 'no-' : ''
      optionHelp += name
      if (option.alias) {
        optionHelp += `, -${option.alias}`
      }

      maxOptionLength = Math.max(maxOptionLength, optionHelp.length)
      options.push([ optionHelp, option.description ])
    }

    const _opts = options.map(([option, description]) => {
      const i = indent(maxOptionLength + optionSpaces - option.length)
      return foldLines(
        option + i + description,
        startSpaces + maxOptionLength + optionSpaces * 2,
        startSpaces + optionSpaces
      )
    }).join('\n')

    const usage = foldLines(`Usage: nuxt ${this.cmd.usage} [options]`, startSpaces)
    const description = foldLines(this.cmd.description, startSpaces)
    const opts = foldLines(`Options:`, startSpaces) + '\n\n' + _opts

    let helpText = colorize(`${usage}\n\n`)
    if (this.cmd.description) {
      helpText += colorize(`${description}\n\n`)
    }
    if (options.length) {
      helpText += colorize(`${opts}\n\n`)
    }

    return helpText
  }
}
