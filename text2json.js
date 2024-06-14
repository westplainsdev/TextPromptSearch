/***************************
 * Example Usage 
 * machine@user$ node text2json.js TextPrompts
 * JSON file successfully generated as output.json
 * 
 **************************/

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const directoryPath = process.argv[2];

if (!directoryPath) {
  console.error('Please provide a directory path as a command-line argument.');
  process.exit(1);
}

function processFiles(directory) {
  const files = fs.readdirSync(directory);

  const jsonContent = [];

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      processFiles(filePath); // Recursively process subdirectories
    } else {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
  
      const prompts = fileContent.split('\n');
  
      prompts.forEach((prompt) => {      
        if (prompt.trim() !== '') {
            const id = uuidv4();
            const name = path.parse(file).name;
  
            jsonContent.push({
              id,
              name,
              prompt: prompt.trim(),
            });
          }
      });
    }
  });

  return jsonContent;
}

const jsonOutput = JSON.stringify(processFiles(directoryPath), null, 2);
fs.writeFileSync('output.json', jsonOutput, 'utf-8');

console.log('JSON file successfully generated as output.json');
