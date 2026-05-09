const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('VitaMotus_Developer Guide_May2026.pdf');

async function run() {
    try {
        const data = await pdf.PDFParse(dataBuffer);
        console.log("PDF TEXT START");
        console.log(data.text);
        console.log("PDF TEXT END");
    } catch (err) {
        console.error("Error parsing PDF:", err);
    }
}

run();
