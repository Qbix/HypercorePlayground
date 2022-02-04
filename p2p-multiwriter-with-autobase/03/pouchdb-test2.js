// const Hypercore = require('hypercore');
// const PouchDB = require('pouchdb');

import Hypercore from 'hypercore';
import PouchDB from 'pouchdb';

// PouchDB.plugin(require('pouchdb-hypercore'));

// import PouchDB from 'pouchdb';

import PouchdbHypercore from '@garbados/pouchdb-hypercore';
PouchDB.plugin(PouchdbHypercore);

async function main() {
  // setup
  const hypercore = new Hypercore('.example_hypercore');
  const pouch = new PouchDB('.example_pouchdb');
  await pouch.fromHypercore(hypercore);
  const key = hypercore.key.toString('hex');
  // hypercore -> pouchdb
  const seq = await new Promise((resolve, reject) => {
    this.hyper.append(JSON.stringify({ hello: 'world' }), (err, seq) => {
      if (err) {
        reject(err);
      } else {
        resolve(seq);
      }
    });
  });
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  const doc = await this.pouch.get(`${key}@${seq}`);
  console.log(doc) >>> { _id: '{key}@{seq}', _rev: '1-...', hello: 'world' };
}

main();
