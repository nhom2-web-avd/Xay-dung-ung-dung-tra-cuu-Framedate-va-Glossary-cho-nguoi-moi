require('dotenv').config();
const fs = require('fs');
const path = require('path');

const distMain = path.join(__dirname, 'dist-server', 'main.js');

if (fs.existsSync(distMain)) {
    require(distMain);
} else {
    console.error('[Server Error] dist-server/main.js not found. Please run "npm run build" before starting the server.');
    process.exit(1);
}
