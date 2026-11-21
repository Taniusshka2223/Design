import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFile(resolve(root,path),'utf8');
let html=await read('index.html');
for(const path of ['assets/css/fonts.css','assets/css/styles.css']){
 const tag='<link rel="stylesheet" href="./'+path+'" />';
 if(!html.includes(tag))throw new Error('Missing '+tag);
 html=html.replace(tag,'<style>\n'+await read(path)+'\n</style>');
}
html=html.replace(/\s*<link rel="preconnect"[^>]*\/>/g,'');
for(const path of ['assets/js/translations.js','assets/js/details.js','assets/js/app.js']){
 const tag='<script defer src="./'+path+'"></script>';
 if(!html.includes(tag))throw new Error('Missing '+tag);
 const code=await read(path);
 if(/<\/script/i.test(code))throw new Error('Unexpected inline script terminator');
 html=html.replace(tag,'');
 html=html.replace('</body>','<script>\n'+code+'\n</script>\n</body>');
}
const icon=await read('assets/icons/favicon.svg');
html=html.replace('href="./assets/icons/favicon.svg"','href="data:image/svg+xml;base64,'+Buffer.from(icon).toString('base64')+'"');
await mkdir(resolve(root,'dist'),{recursive:true});
await writeFile(resolve(root,'dist/index.html'),html);
console.log('Build complete: dist/index.html');
