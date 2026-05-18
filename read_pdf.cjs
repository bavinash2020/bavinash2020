const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Avinash Kumar- Minor  Project 3 rd sem.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('pdf_text.txt', data.text);
    console.log('PDF text extracted successfully.');
}).catch(err => {
    console.error('Error reading PDF:', err);
});
