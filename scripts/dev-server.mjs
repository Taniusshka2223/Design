import http from'node:http';
import{createReadStream}from'node:fs';
import{stat}from'node:fs/promises';
import{resolve,extname,sep}from'node:path';
const root=process.cwd(),port=Number(process.env.PORT||8000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
http.createServer(async(req,res)=>{try{
const url=new URL(req.url,'http://localhost'),path=resolve(root,'.'+(url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname)));
if(path!==root&&!path.startsWith(root+sep))return res.writeHead(403).end('Forbidden');
const file=await stat(path);if(!file.isFile())throw Error('Directory');
res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'});createReadStream(path).pipe(res);
}catch{res.writeHead(404).end('Not found')}}).listen(port,()=>console.log('http://localhost:'+port));
