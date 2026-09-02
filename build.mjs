import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = dirname(fileURLToPath(import.meta.url));
const esbuild = process.env.ESBUILD_BIN || 'esbuild';
const read = (name) => readFileSync(join(root, name), 'utf8');

function writeOutput(outputName, content) {
  const outputPath = join(root, outputName);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}

function buildJs(outputName, sources) {
  const source = sources.map(read).join('\n;\n');
  const output = execFileSync(esbuild, [
    '--minify-syntax',
    '--minify-whitespace',
    '--legal-comments=none',
    '--charset=utf8',
  ], { input: source, encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'] });
  writeOutput(outputName, output);
}

function buildCss(outputName, source) {
  const output = execFileSync(esbuild, [
    '--minify',
    '--legal-comments=none',
    '--charset=utf8',
    '--loader=css',
  ], { input: source, encoding: 'utf8', stdio: ['pipe', 'pipe', 'inherit'] });
  writeOutput(outputName, output);
}

const cssLines = read('src/styles.css').split('\n');
const primaryCss = [
  ...cssLines.slice(0, 471),
  ':root{--timer-pop-system-font:ui-rounded,"Arial Rounded MT Bold","Trebuchet MS",Roboto,system-ui,sans-serif;}',
  'input,textarea{caret-color:transparent!important;}',
].join('\n');
const gamesCss = [
  ...cssLines.slice(471),
  '#gamesAll{contain:layout paint style;}',
].join('\n');

buildJs('dist/app.min.js', ['src/timer-engine.js', 'src/core.js', 'src/dotabyss.js', 'src/bootstrap.js']);
buildJs('dist/games.min.js', ['src/g-generation.js', 'src/star-leap.js']);
buildCss('dist/app.min.css', primaryCss);
buildCss('dist/games.min.css', gamesCss);
