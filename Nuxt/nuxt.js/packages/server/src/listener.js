import http from 'http'
import https from 'https'
import enableDestroy from 'server-destroy'
import ip from 'ip'
import consola from 'consola'
import pify from 'pify'

export default class Listener {
  constructor({ port, host, socket, https, app, dev }) {
    // Options
    this.port = port
    this.host = host
    this.socket = socket
    this.https = https
    this.app = app
    this.dev = dev

    // After listen
    this.listening = false
    this._server = null
    this.server = null
    this.address = null
    this.url = null
  }

  async close() {
    // Destroy server by forcing every connection to be closed
    if (this.server && this.server.listening) {
      await this.server.destroy()
      consola.debug('server closed')
    }

    // Delete references
    this.listening = false
    this._server = null
    this.server = null
    this.address = null
    this.url = null
  }

  computeURL() {
    const address = this.server.address()
    if (!this.socket) {
      switch (address.address) {
        case '127.0.0.1': this.host = 'localhost'; break
        case '0.0.0.0': this.host = ip.address(); break
      }
      this.port = address.port
      this.url = `http${this.https ? 's' : ''}://${this.host}:${this.port}`
      return
    }
    this.url = `unix+http://${address}`
  }

  async listen() {
    // Prevent multi calls
    if (this.listening) {
      return
    }

    // Initialize underlying http(s) server
    const protocol = this.https ? https : http
    const protocolOpts = typeof this.https === 'object' ? [this.https] : []
    this._server = protocol.createServer.apply(protocol, protocolOpts.concat(this.app))

    // Call server.listen
    // Prepare listenArgs
    const listenArgs = this.socket ? { path: this.socket } : { host: this.host, port: this.port }
    listenArgs.exclusive = false

    // Call server.listen
    try {
      this.server = await new Promise((resolve, reject) => {
        this._server.on('error', error => reject(error))
        const s = this._server.listen(listenArgs, error => error ? reject(error) : resolve(s))
      })
    } catch (error) {
      return this.serverErrorHandler(error)
    }

    // Enable destroy support
    enableDestroy(this.server)
    pify(this.server.destroy)

    // Compute listen URL
    this.computeURL()

    // Set this.listening to true
    this.listening = true
  }

  serverErrorHandler(error) {
    // Detect if port is not available
    const addressInUse = error.code === 'EADDRINUSE'

    // Use better error message
    if (addressInUse) {
      error.message = `Address \`${this.host}:${this.port}\` is already in use.`
    }

    // Listen to a random port on dev as a fallback
    if (addressInUse && this.dev && this.port !== '0') {
      consola.warn(error.message)
      consola.info('Trying a random port...')
      this.port = '0'
      return this.close().then(() => this.listen())
    }

    // Throw error
    throw error
  }
}
