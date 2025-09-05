import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'apps/b2b-buyer-portal/dist');
const publicDir = path.join(rootDir, 'apps/catalyst/public');
const destDir = path.join(publicDir, 'b2b');

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(srcDir))) {
    throw new Error(`Source directory not found: ${srcDir}`);
  }

  await fs.mkdir(publicDir, { recursive: true });

  await fs.rm(destDir, { recursive: true, force: true });
  await fs.cp(srcDir, destDir, {
    recursive: true,
    force: true,
    dereference: true,
  });

  console.log(`Copied contents of ${srcDir} -> ${destDir}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
