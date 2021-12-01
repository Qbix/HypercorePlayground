// Creating Autobases

import Corestore from 'corestore';
import Hypercore from 'hypercore';
import Autobase from 'autobase';
import ram from 'random-access-memory';

// Create two chat users, each with their own Hypercores.
// Here since we'll be rerunning the same code a lot, we'll use the ram storage

const store = new Corestore(ram);
const userA = store.get({ name: 'userA' });
const userB = store.get({ name: 'userB' });

// Make an Autobase with those two users as inputs.

const baseA = new Autobase([userA, userB], { input: userA });
const baseB = new Autobase([userA, userB], { input: userB });

await baseA.append('A0: hello!');
await baseB.append('B0: hi! good to hear from you');
await baseA.append('A1: likewise. fun exercise huh?');
await baseB.append('B1: yep. great time.');

// Let's print all messages in causal order
for await (const node of baseA.createCausalStream()) {
  console.log(node.value.toString());
  // console.log(node.clock);
}

const indexCore = store.get({ name: 'index-core' });
const index = baseA.createRebasedIndex(indexCore);

await index.update();

// The block at index 0 is a header block, so we skip over that.
for (let i = 1; i < index.length; i++) {
  const node = await index.get(i);
  console.log(node.value.toString());
}
