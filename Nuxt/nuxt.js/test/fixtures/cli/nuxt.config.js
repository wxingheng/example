export default {
  serverMiddleware: [
    '~/middleware.js',
    (req, res, next) => next()
  ],
  watch: ['~/custom.file'],
  hooks(hook) {
    hook('listen', (server, { port, host }) => {
      process.stdout.write(`Listening on http://${host}:${port}`)
    })
  }
}
