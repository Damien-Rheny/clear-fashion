/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');

async function sandbox () {
  try {
    let products = [];

    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find Loom products only');

    const loomOnly = await db.find({'brand': 'loom'});

    console.log(`👕 ${loomOnly.length} total of products found for Loom`);
    console.log(loomOnly);

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
