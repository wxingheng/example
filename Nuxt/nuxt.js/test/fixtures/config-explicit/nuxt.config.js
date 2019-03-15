import path from 'path'

export default {
  modulesDir: path.join(__dirname, '..', '..', '..', 'node_modules'),
  transition: false,
  vue: {
    config: {
      silent: false,
      performance: true,
      devtools: true
    }
  }
}
