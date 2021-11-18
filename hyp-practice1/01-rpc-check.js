const { Client } = require('hyperspace');

start();

async function start() {
  const c = new Client();

  // Ask for the RPC server status to see that everything works
  console.log(await c.status());
}
