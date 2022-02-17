const SDK = require('../../hyperspace')
const { isBrowser } = require('./env')

const HYPERSPACE_TEST_PORT = 9000

module.exports = async function createHyperspace (n) {
  const cleanups = []
  const sdks = []
  if (!isBrowser) {
    const { createMany } = require('hyperspace/test/helpers/create')
    const { clients, cleanup: cleanupHyperspace } = await createMany(n)
    cleanups.push(cleanupHyperspace)
    for (const client of clients) {
      const sdk = await SDK({
        hyperspaceOpts: { client }
      })
      sdks.push(sdk)
    }
  } else {
    let port = HYPERSPACE_TEST_PORT
    while (port < HYPERSPACE_TEST_PORT + n) {
      const sdk = await SDK({
        hyperspaceOpts: { port }
      })
      sdks.push(sdk)
      port++
    }
  }

  return { sdks, cleanup }

  async function cleanup () {
    console.log('# [test/hyperspace] cleanup start')
    await Promise.all(cleanups.map(cleanup => cleanup()))
    console.log('# [test/hyperspace] cleanup end')
  }
}
