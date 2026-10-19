// Publishes the tarballs `pnpm release:pack` left in release/ to npm (ADR 0001). npm, not pnpm, does the upload: it
// authenticates through trusted publishing in GitHub Actions. A version that is already on npm is skipped, so the
// release workflow can be rerun after a later step failed.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { packages, sharedVersion } from './packages.mjs';

const releaseDir = fileURLToPath(new URL('../release/', import.meta.url));
const version = sharedVersion();

// Same naming as release-pack.mjs: @solid-slopkit/components@1.2.3 -> solid-slopkit-components-1.2.3.tgz.
const tarball = (name) => `${releaseDir}${name.replace('@', '').replace('/', '-')}-${version}.tgz`;

/** Whether `name@version` is on the registry. `npm view` prints nothing for a missing version of a known package. */
function published(name) {
  try {
    return execFileSync('npm', ['view', `${name}@${version}`, 'version'], { encoding: 'utf8' }).trim() === version;
  } catch {
    return false; // E404: the package itself isn't on npm yet.
  }
}

for (const { name } of packages()) {
  if (published(name)) {
    console.log(`${name}@${version} is already on npm, skipping.`);
    continue;
  }
  if (!existsSync(tarball(name))) {
    console.error(`Expected ${tarball(name)}: run \`pnpm release:pack\` first.`);
    process.exit(1);
  }
  execFileSync('npm', ['publish', tarball(name), '--access', 'public'], { stdio: 'inherit' });
  console.log(`Published ${name}@${version}`);
}
