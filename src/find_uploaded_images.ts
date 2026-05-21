import fs from 'fs';
import path from 'path';

function findImageFiles(dir: string, depth = 0) {
  if (depth > 4) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file.startsWith('.') || file === 'node_modules' || file === 'node_modules' || file === 'dist') continue;
      
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (err) {
        continue;
      }
      
      if (stat.isDirectory()) {
        findImageFiles(fullPath, depth + 1);
      } else if (/\.(png|jpe?g|webp|svg|gif)$/i.test(file)) {
        console.log(`FOUND IMAGE: ${fullPath} (${stat.size} bytes)`);
      }
    }
  } catch (err) {}
}

console.log("Searching in workspace relative root '.'...");
findImageFiles('.');

console.log("\nSearching in parent '..'...");
findImageFiles('..');

console.log("\nSearching in root '/'...");
try {
  const rootFiles = fs.readdirSync('/');
  console.log("Root folder contents:", rootFiles);
  // Search in some likely folders
  ['/workspace', '/app', '/home', '/mnt', '/media'].forEach(p => {
    if (fs.existsSync(p)) {
      console.log(`Searching in ${p}...`);
      findImageFiles(p);
    }
  });
} catch (e) {}
