import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('./',import.meta.url);
const read=name=>readFile(new URL(name,base),'utf8');
const [template,css,survey,app,icon]=await Promise.all(['index.template.html','styles.css','survey.mjs','app.js','icon.svg'].map(read));
const script=survey.replace(/^export /gm,'')+'\n'+app.replace(/^import .*?;\r?\n/,'');
const html=template
  .replace('<link rel="icon" href="./icon.svg" type="image/svg+xml">',`<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}" type="image/svg+xml">`)
  .replace('<link rel="stylesheet" href="./styles.css">',`<style>\n${css}\n</style>`)
  .replace('  <script type="module" src="./app.js"></script>\n','')
  .replace('href="./" class="wordmark"','href="./index.html" class="wordmark"')
  .replace('</body>',`<script>\n(()=>{\n${script.replace(/<\/script/gi,'<\\/script')}\n})();\n</script>\n</body>`);
await writeFile(new URL('index.html',base),html);
console.log('Built standalone index.html (works over HTTPS and file://).');
