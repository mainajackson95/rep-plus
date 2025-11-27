import { promises as fs } from 'fs';
import path from 'path';

const root = process.cwd();
const srcDir = root;
const outDir = path.join(root, 'dist', 'firefox');

const ignore = new Set([
  'node_modules',
  '.git',
  'dist',
  '.gitignore',
  '.github',
  'scripts/build-firefox.mjs', // will be copied but we can allow; keeping for clarity
]);

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyDir(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    if (ignore.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  await ensureDir(outDir);
  await copyDir(srcDir, outDir);

  // Replace manifest with Firefox variant
  const ffManifestSrc = path.join(root, 'manifest.firefox.json');
  const manifestDest = path.join(outDir, 'manifest.json');
  try {
    const content = await fs.readFile(ffManifestSrc, 'utf8');
    await fs.writeFile(manifestDest, content, 'utf8');
    console.log('Wrote Firefox manifest to dist/firefox/manifest.json');
  } catch (e) {
    console.error('Failed to find manifest.firefox.json. Make sure it exists at the repo root.');
    process.exit(1);
  }

  console.log('Firefox build created at dist/firefox');
})();
