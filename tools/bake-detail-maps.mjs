// Rebuilds the DETAIL_BAKED line in index.html from genDetailMaps, so the baked maps always match the generator.
// Run from the repo root: node tools/bake-detail-maps.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

const file = 'index.html';
const src = fs.readFileSync(file, 'utf8');
const N = Number(/^const DETAIL_BAKED_N = (\d+);$/m.exec(src)?.[1]);
if (!N) throw new Error('DETAIL_BAKED_N not found');

// One top-level function's source, cut out of index.html by matching its braces.
function grab(re) {
  const i = src.search(re);
  if (i < 0) throw new Error(`not found: ${re}`);
  let depth = 0;
  for (let j = src.indexOf('{', i); j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}' && --depth === 0) return src.slice(i, j + 1);
  }
  throw new Error(`unbalanced: ${re}`);
}

const gen = new Function(`${grab(/^function mulberry32\(/m)}\n${grab(/^function genDetailMaps\(/m)}\nreturn genDetailMaps;`)();
const { A, B } = gen(N);
const raw = Buffer.concat([Buffer.from(A.buffer, A.byteOffset, A.byteLength), Buffer.from(B.buffer, B.byteOffset, B.byteLength)]);
const b64 = zlib.deflateRawSync(raw, { level: 9 }).toString('base64');
const line = `const DETAIL_BAKED = '${b64}';`;
const out = src.replace(/^const DETAIL_BAKED = '[^']*';$/m, () => line);
if (out === src && !src.includes(line)) throw new Error('DETAIL_BAKED line not found');
fs.writeFileSync(file, out);
console.log(`baked genDetailMaps(${N}): ${(b64.length / 1e6).toFixed(2)} MB of base64`);
