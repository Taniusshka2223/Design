import{readFile,stat}from'node:fs/promises';
import{spawnSync}from'node:child_process';
const required=['index.html','assets/css/fonts.css','assets/css/styles.css','assets/js/translations.js','assets/js/details.js','assets/js/app.js','assets/icons/favicon.svg'];
for(const path of required){const s=await stat(path);if(!s.size)throw Error('Empty file '+path);}
for(const path of required.filter(p=>p.endsWith('.js'))){const r=spawnSync(process.execPath,['--check',path]);if(r.status)throw Error('Invalid JS '+path);}
const html=await readFile('index.html','utf8');for(const path of required.slice(1))if(!html.includes('./'+path))throw Error('Missing reference: '+path);
const app=await readFile('assets/js/app.js','utf8');for(const route of ['work/all','achievements/overview','problems','plans','details/traffic'])if(!app.includes(route))throw Error('Missing route: '+route);
console.log('Checks passed: files, references, JavaScript syntax and routes');
