// Using Corestore to make Hypercores

import Corestore from 'corestore';

const store = new Corestore('./store');

// You can access cores from the store either by their public key or a local name
const core = store.get({ name: 'qbix-first-core' });

await core.ready();

// await core.get(core.key.toString('hex'));

console.log('Core public key:', core.key.toString('hex'));
console.log('Core has', core.length, 'entries');
console.log(core);

const sameCore = store.get(
  Buffer.from(
    '6bb4c3042c8ceec7be073c21a41dda613b0db22943e47bee400d20745a36c634'
  )
);

console.log('Same core:', sameCore);

await core.append(Buffer.from('a block'));
