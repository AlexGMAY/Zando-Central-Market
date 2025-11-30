// find-mongo-imports.js
const fs = require('fs');
const path = require('path');

function checkFileForMongoDB(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('mongodb') || content.includes('mongoose')) {
      console.log('MongoDB import found in:', filePath);
      
      // Show the specific lines
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('mongodb') || line.includes('mongoose')) {
          console.log(`  Line ${index + 1}: ${line.trim()}`);
        }
      });
      console.log('---');
    }
  } catch (error) {
    // Skip files that can't be read
  }
}

function scanDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    
    try {
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!item.includes('node_modules') && !item.includes('.next')) {
          scanDirectory(fullPath);
        }
      } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js')) {
        checkFileForMongoDB(fullPath);
      }
    } catch (error) {
      // Skip files that can't be accessed
    }
  }
}

console.log('Scanning for MongoDB imports...');
scanDirectory('./app');
scanDirectory('./components');
scanDirectory('./hooks');
scanDirectory('./lib');