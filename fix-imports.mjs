import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, 'Aacharya-website/client/src');

function walkDir(dir) {
    let files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (entry.isFile() && (fullPath.endsWith('.js') || fullPath.endsWith('.jsx'))) {
            files.push(fullPath);
        }
    }
    return files;
}

const files = walkDir(SRC_DIR);
let updatedFiles = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Regex to find import statements from assets ending in .png, .jpg, .jpeg
    // Example: import hero from '../assets/hero.png'
    // Example: import img from '../../assets/img.jpg.jpeg'
    const regex = /(from\s+['"].*?assets.*?)\.(png|jpg|jpeg|jpg\.jpeg)['"]/gi;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, "$1.webp'");
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Fixed imports in: ${path.relative(SRC_DIR, file)}`);
        updatedFiles++;
    }
}

console.log(`\nUpdated imports in ${updatedFiles} files.`);
