import path from 'path'

export default function () {
  // Disable parsing pages/
  this.nuxt.options.build.createRoutes = () => {}

  // Add /api endpoint
  this.addTemplate({
    fileName: 'router.js',
    src: path.resolve(this.options.srcDir, 'router.js')
  })
}
