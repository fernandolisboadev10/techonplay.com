// Generate a blog image through the OpenRouter Images API and save it as WebP.
//
// Usage:
//   npm run image -- --name my-post --prompt "Close-up of a developer's hands typing..."
//   npm run image -- --name my-post-diagram --prompt "..." --aspect 1:1 --width 1024
//
// Reads OPENROUTER_API_KEY from .env (gitignored) via `node --env-file-if-exists`.
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { parseArgs, parseEnv } from 'node:util';
import path from 'node:path';
import sharp from 'sharp';

const OUT_DIR = 'src/content/blog/images';

// The project's .env wins over variables already set in the shell (node --env-file never overrides them).
Object.assign(process.env, parseEnv(await readFile('.env', 'utf8').catch(() => '')));

// House style, see the hero image art direction: US tech-journalism editorial photography.
const STYLE =
  'Photorealistic editorial tech-journalism photograph in the style of TechCrunch or The Verge: cinematic lighting ' +
  '(natural window light, warm soft studio light, or moody ambient/neon rim light depending on the scene), shallow ' +
  'depth of field with soft bokeh, sharp focus on the main subject, high level of detail, 35mm lens look. Modern ' +
  'office, home desk, or developer workspace setting. Any on-screen text must be blurred or illegible. No real ' +
  'company logos or wordmarks, no watermarks, no glowing sci-fi holograms, no fantasy digital art. Subject: ';

const { values: opt } = parseArgs({
  options: {
    name: { type: 'string' },
    prompt: { type: 'string' },
    aspect: { type: 'string', default: '3:2' }, // matches the hero and card layout
    width: { type: 'string', default: '1200' }, // final WebP width; height follows the aspect ratio
    model: { type: 'string', default: process.env.OPENROUTER_IMAGE_MODEL ?? 'openai/gpt-image-2' },
    quality: { type: 'string' }, // low | medium | high | auto; omitted unless given, not every model accepts it
    'webp-quality': { type: 'string', default: '80' },
    raw: { type: 'boolean', default: false }, // skip the house style prefix
    force: { type: 'boolean', default: false }, // overwrite an existing file
  },
});

const fail = (msg) => {
  throw new Error(msg);
};

async function main() {
  if (!opt.name || !opt.prompt) fail('Missing --name and/or --prompt.');
  if (!process.env.OPENROUTER_API_KEY) fail('OPENROUTER_API_KEY is not set. Add it to .env and run through `npm run image`.');

  const name = opt.name.replace(/\.webp$/i, '');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) fail('--name must be lowercase kebab-case (letters, digits, hyphens).');

  const outPath = path.join(OUT_DIR, `${name}.webp`);
  const exists = await access(outPath).then(() => true, () => false);
  if (exists && !opt.force) fail(`${outPath} already exists. Pass --force to overwrite.`);

  const prompt = opt.raw ? opt.prompt : STYLE + opt.prompt;

  console.log(`Generating ${outPath} with ${opt.model} (${opt.aspect})...`);
  const res = await fetch('https://openrouter.ai/api/v1/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: opt.model,
      prompt,
      aspect_ratio: opt.aspect,
      ...(opt.quality && { quality: opt.quality }),
    }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) fail(`OpenRouter error ${res.status}: ${body.error?.message ?? JSON.stringify(body)}`);

  const item = body.data?.[0];
  let source;
  if (item?.b64_json) source = Buffer.from(item.b64_json, 'base64');
  else if (item?.url) source = Buffer.from(await (await fetch(item.url)).arrayBuffer());
  else fail('The API response did not include image data.');

  const webp = await sharp(source)
    .resize({ width: Number(opt.width) })
    .webp({ quality: Number(opt['webp-quality']) })
    .toBuffer();

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(outPath, webp);

  const { width, height } = await sharp(webp).metadata();
  const cost = body.usage?.cost != null ? `, cost $${body.usage.cost}` : '';
  console.log(`Saved ${outPath} (${width}x${height}, ${(webp.length / 1024).toFixed(0)} KB${cost})`);
  console.log(`Markdown: ![alt text](./images/${name}.webp)`);
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
