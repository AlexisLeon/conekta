const path = require('path');
global.__app = path.join(__dirname, '..', 'src');
const db = require('../src/init/db');

const forceSyc = process.argv.find(e => e === '--drop'); // drop before create?

db.sync({ force: true })
  .then(() => {
    console.log('Done');
    process.exit(0);
  });
