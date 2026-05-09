const fs = require('fs');
const pdf = require('pdf-parse');

console.log("PDF Keys:", Object.keys(pdf));
if (pdf.default) console.log("PDF Default Keys:", Object.keys(pdf.default));
