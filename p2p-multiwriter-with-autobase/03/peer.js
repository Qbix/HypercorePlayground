// Replicating a Corestore

import Corestore from 'corestore';
import Hyperswarm from 'hyperswarm';

const store = new Corestore('./peer-store');
const swarm = new Hyperswarm();

// Setup corestore replication
swarm.on('connection', (connection) => store.replicate(connection));

// Load a core by public key
const core = store.get(
  Buffer.from(
    '3a8f5c58aecdfb4c9ce1060af029297c8be33f160792b971a62e1cb83b4aa871',
    'hex'
  )
);

await core.ready();

// Join the Hypercore discoveryKey (a hash of it's public key)
swarm.join(core.discoveryKey);

// Make sure we have all the connections
await swarm.flush();

// Make sure we have the latest length
await core.update();

// Print the length (should print 10000)
console.log('Core length is:', core.length);
