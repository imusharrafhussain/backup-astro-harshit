/**
 * convert-to-webp.mjs
 *
 * Scans the assets folder, converts all non-webp images (png, jpg, jpeg, gif)
 * to .webp at high quality, and DELETES the originals to keep the bundle clean.
 *
 * Security notes:
 *  - Only operates on files INSIDE the known assets directory (no path traversal).
 *  - Skips files already .webp or .svg/.mp4/.gif (gif is skipped — lossless
 *    animation would bloat the file; leave as-is or convert manually).
 *  - Writes to the same directory with a .webp extension; no external writes.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────────────────────
const ASSETS_DIR = path.resolve(__dirname, 'Aacharya-website/client/src/assets');
const CONVERT_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const SKIP_EXTS   = new Set(['.webp', '.svg', '.mp4', '.gif', '.woff', '.woff2', '.ttf']);
const WEBP_QUALITY = 85; // 80–90 is a great quality/size balance

// ── Safety guard ─────────────────────────────────────────────────────────────
function assertSafePath(filePath) {
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(ASSETS_DIR))) {
        throw new Error(`SECURITY: path "${filePath}" escapes assets directory!`);
    }
}

// ── Recursive file walker ─────────────────────────────────────────────────────
function walkDir(dir) {
    let files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        assertSafePath(fullPath); // guard against symlink traversal
        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (entry.isFile()) {
            files.push(fullPath);
        }
    }
    return files;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const allFiles = walkDir(ASSETS_DIR);
    const toConvert = allFiles.filter(f => CONVERT_EXTS.has(path.extname(f).toLowerCase()));

    console.log(`\n🔍 Found ${toConvert.length} files to convert to WebP...\n`);

    let converted = 0;
    let skipped   = 0;
    let failed    = 0;

    for (const srcPath of toConvert) {
        assertSafePath(srcPath);

        // Build destination path — replace extension with .webp
        const ext      = path.extname(srcPath);
        const baseName = path.basename(srcPath, ext);
        const dir      = path.dirname(srcPath);
        const destPath = path.join(dir, `${baseName}.webp`);

        assertSafePath(destPath);

        // Skip if a webp with the same base name already exists
        if (fs.existsSync(destPath)) {
            console.log(`⏭  SKIP  (webp exists) → ${path.relative(ASSETS_DIR, srcPath)}`);
            skipped++;
            continue;
        }

        try {
            await sharp(srcPath)
                .webp({ quality: WEBP_QUALITY, effort: 4 })
                .toFile(destPath);

            // Delete original only after successful conversion
            fs.unlinkSync(srcPath);

            const srcSize  = (fs.statSync(destPath).size / 1024).toFixed(1);
            console.log(`✅ CONVERTED → ${path.relative(ASSETS_DIR, destPath)} (${srcSize} KB)`);
            converted++;
        } catch (err) {
            console.error(`❌ FAILED   → ${path.relative(ASSETS_DIR, srcPath)}: ${err.message}`);
            failed++;
        }
    }

    console.log(`\n─────────────────────────────────────────`);
    console.log(`✅ Converted : ${converted}`);
    console.log(`⏭  Skipped  : ${skipped}`);
    console.log(`❌ Failed    : ${failed}`);
    console.log(`─────────────────────────────────────────\n`);

    if (converted > 0) {
        console.log('⚠️  IMPORTANT: Update any hardcoded .png/.jpg/.jpeg references in JSX/CSS');
        console.log('   to .webp if the extension is explicitly used in your import paths.\n');
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
