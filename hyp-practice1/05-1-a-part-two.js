const { Client } = require('hyperspace');

const STATS_KEY =
  'c203a43ef16c777c2c780226a0e1595c05082679c164f905fa3ea37faa7376ed';

// Tweak this to your liking. This will query for stats collected 10 min ago.
const TARGET = new Date(Date.now() - 60 * 1e4);

// Toggle these ones on-and-off to see different behaviors.
const PREFETCH = false;
const NAIVE_MODE = false;

start();

async function start() {
  const { corestore, network, replicate } = new Client();
  const store = corestore();

  // Get the stats core.
  const statsCore = store.get({ key: STATS_KEY, valueEncoding: 'json' });

  // Connect the stats core to the network.
  await replicate(statsCore);

  let blocksDownloaded = 0;
  statsCore.on('download', () => {
    blocksDownloaded++;
  });

  setInterval(() => {
    console.log('Blocks Downloaded:', blocksDownloaded);
  }, 5000);

  const algorithm = NAIVE_MODE ? naiveClosestStats : bisectClosestStats;

  // If PREFETCH is true, we'll mark the entire core for parallel downloading.
  if (PREFETCH) statsCore.download();

  const closestStats = await algorithm(statsCore, TARGET);

  if (!closestStats) {
    console.log('No stats found for that time.');
  } else {
    console.log('Found stats:', closestStats);
  }
}

async function naiveClosestStats(core, target) {
  for (let i = 0; i < core.length - 1; i++) {
    const block = await core.get(i);
    if (new Date(block.timestamp) >= target) return block;
  }
  return null;
}

async function getClosestStatsBisect(core, target) {
  return bisect(core, target, {
    get: (idx) => core.get(idx),
    map: (block) => block.timestamp,
  });
}

async function bisectClosestStats(core, target) {
  let lower = 0;
  let upper = core.length;

  while (lower < upper) {
    const mid = Math.floor((upper + lower) / 2);

    // These tertiary operaters lets us easily test with Arrays first.
    const block = await core.get(mid);
    const date = new Date(block.timestamp);

    if (date < target) lower = mid + 1;
    else upper = mid;
  }

  return core.get(lower);
}
