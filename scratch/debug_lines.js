const fs = require('fs');
const content = fs.readFileSync('app/species/[slug]/page.js', 'utf8');
const lines = content.split('\n');
console.log(JSON.stringify(lines[103])); // Line 104
console.log(JSON.stringify(lines[104])); // Line 105
