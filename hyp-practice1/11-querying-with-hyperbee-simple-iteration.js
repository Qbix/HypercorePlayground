// Run this file with the hyperspace-simulator
// hyperspace-simulator filename.js

const { Client } = require('hyperspace');
const Hyperbee = require('hyperbee');
const definitions = require('websters-english-dictionary').kvPairs();

start();

async function start() {
  const { corestore, replicate } = new Client();
  const store = corestore();

  const core = store.get({ name: 'hyperbee-exercise-dictionary' });

  // Create a new Hyperbee database with String keys/values.
  const db = new Hyperbee(core, {
    keyEncoding: 'utf-8',
    valueEncoding: 'utf-8',
  });

  // Make a new core and instantiate a new Hyperbee for that

  const batch = db.batch();

  for (const { key, value } of definitions) {
    // Insert all key values into the db batch
    await batch.put(key, value);
  }

  // Flushing the batch appends all the entries to Hyperbee efficiently.
  await batch.flush();

  const { value } = await db.get('exercise');

  console.log("All words between 'hello' and 'helmet', inclusive:");
  for await (const data of db.createReadStream({
    gte: 'hello',
    lte: 'helmet',
  })) {
    console.log(data);
  }

  console.log('exercise value:', value);
}
