import fs from 'fs'
import execa from 'execa'
import NuxtCommand from './command'
import setup from './setup'
import getCommand from './commands'

export default async function run(_argv) {
  // Read from process.argv
  const argv = _argv ? Array.from(_argv) : process.argv.slice(2)

  // Check for internal command
  let cmd = await getCommand(argv[0])

  // Matching `nuxt` or `nuxt [dir]` or `nuxt -*` for `nuxt dev` shortcut
  if (!cmd && (!argv[0] || argv[0][0] === '-' || fs.existsSync(argv[0]))) {
    argv.unshift('dev')
    cmd = await getCommand('dev')
  }

  // Setup env
  setup({ dev: argv[0] === 'dev' })

  // Try internal command
  if (cmd) {
    return NuxtCommand.run(cmd, argv.slice(1))
  }

  // Try external command
  try {
    await execa(`nuxt-${argv[0]}`, argv.slice(1), {
      stdout: process.stdout,
      stderr: process.stderr,
      stdin: process.stdin
    })
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw String(`Command not found: nuxt-${argv[0]}`)
    }
    throw String(`Failed to run command \`nuxt-${argv[0]}\`:\n${error}`)
  }
}
