const fs = require('fs');

// Read the file contents into a string
const fileContents = fs.readFileSync('d.csv', 'utf8');

// Split the string on newline characters to create an array of filepaths
const filepaths = fileContents.split('\n');

// Use the map() method to iterate over each element in the array and
// replace the file path at the beginning of each element with an empty string
const lastParts = filepaths.map(filepath => filepath.replace('C:\\Users\\curti\\Music\\', ''));

// Use the map() method again to iterate over each element in the array and
// remove the \r character from the end of each element
const bandNames = lastParts.map(lastPart => lastPart.replace(/\r$/, ''));

console.log(bandNames);
let final = bandNames.join();
fs.writeFileSync('bands.txt', final);

