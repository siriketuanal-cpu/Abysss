import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const root = dirname(fileURLToPath(import.meta.url));
const esbuild = process.env.ESBUILD_BIN || 'esbuild';
const read = n => readFileSync(join(root, n), 'utf8');
const write = (n, c) => { const p = join(root, n); mkdirSync(dirname(p), {recursive:true}); writeFileSync(p,c); };
function js(out, files) { write(out, execFileSync(esbuild,['--minify-syntax','--minify-whitespace','--legal-comments=none','--charset=utf8'],{input:files.map(read).join('\n;\n'),encoding:'utf8'})); }
function css(out, src) { write(out, execFileSync(esbuild,['--minify','--legal-comments=none','--charset=utf8','--loader=css'],{input:src,encoding:'utf8'})); }
const lines = read('src/styles.css').split('\n');
css('dist/app.min.css',[...lines.slice(0,471),':root{--timer-pop-system-font:ui-rounded,"Arial Rounded MT Bold","Trebuchet MS",Roboto,system-ui,sans-serif;}','input,textarea{caret-color:transparent!important;}'].join('\n'));
css('dist/games.min.css',[...lines.slice(471),'#gamesAll{contain:layout paint style;}'].join('\n'));
js('dist/app.min.js',['src/chrono-core.js','src/core.js','src/chrono-overrides.js','src/dotabyss.js','src/bootstrap.js']);
js('dist/games.min.js',['src/g-generation.js','src/star-leap.js']);
