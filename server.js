import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {networkInterfaces} from 'node:os';
import {WebSocketServer,WebSocket} from 'ws';
import {tick,snapshot} from './simulation.js';
import {createLobby,joinLobby,leaveLobby,startLobby,lobbySnapshot} from './lobby.js';
const index=new URL('./index.html',import.meta.url);
const argPort=process.argv.indexOf('--port');
const port=Number(process.env.PORT)||(argPort>=0?Number(process.argv[argPort+1]):3000);
function lanAddresses(){return [...new Set(Object.values(networkInterfaces()).flat().filter(a=>a&&a.family==='IPv4'&&!a.internal&&!a.address.startsWith('169.254.')).map(a=>`http://${a.address}:${port}`))];}
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  if(url.pathname==='/health'||url.pathname==='/lan-info'){
   const body=JSON.stringify(url.pathname==='/health'?{ok:true,version:'0.5'}:{addresses:lanAddresses()});
   res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?undefined:body);
  }
  if(!['/','/index.html'].includes(url.pathname)){res.writeHead(404);return res.end('Not found');}
  const body=await readFile(index);res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(500);res.end('Game file unavailable');}
});
const wss=new WebSocketServer({server,maxPayload:2048});const rooms=new Map();
const send=(ws,data)=>{if(ws.readyState===WebSocket.OPEN&&ws.bufferedAmount<100000)ws.send(JSON.stringify(data));};
const broadcast=(r,data)=>{for(const ws of r.clients.keys())send(ws,data);};
const announce=r=>broadcast(r,{type:'lobby',...lobbySnapshot(r),addresses:lanAddresses()});
wss.on('connection',(ws,req)=>{
 if(wss.clients.size>100){ws.close(1013,'Server voll');return;}
 const allowed=process.env.ALLOWED_ORIGINS?.split(',').map(s=>s.trim());if(allowed&&!allowed.includes(req.headers.origin)){ws.close(1008,'Origin nicht erlaubt');return;}
 let room=null,p=null,messages=0,windowStart=Date.now();ws.alive=true;ws.on('pong',()=>ws.alive=true);ws.on('error',()=>{});
 const joinTimeout=setTimeout(()=>{if(!p)ws.close(1008,'Beitritt fehlt');},10000);
 ws.on('message',raw=>{
  if(Date.now()-windowStart>1000){messages=0;windowStart=Date.now();}if(++messages>90){ws.close(1008,'Zu viele Nachrichten');return;}
  try{
   const m=JSON.parse(raw);if(!m||typeof m!=='object')return;
   if(m.type==='join'&&!p){
    let code=String(m.room||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,12);
    let candidate;
    if(m.create){if(rooms.size>=20)throw Error('Server voll.');do{code=randomBytes(3).toString('hex').toUpperCase();}while(rooms.has(code));candidate=createLobby(code);}
    else {candidate=rooms.get(code);if(!candidate)throw Error('Raum nicht gefunden. Code prüfen.');}
    p=joinLobby(candidate,ws,randomBytes(8).toString('hex'),m.name,m.weapon);room=candidate;rooms.set(code,room);clearTimeout(joinTimeout);
    send(ws,{type:'joined',id:p.id,room:code,phase:'waiting',protocol:5});announce(room);
   }else if(m.type==='start'&&p){
    startLobby(room,p.id);broadcast(room,{type:'started',room:room.code,state:snapshot(room.game)});
   }else if(m.type==='input'&&p&&room.phase==='playing'){
    const i=m.input||{};p.input={forward:Number.isFinite(i.forward)?i.forward:0,side:Number.isFinite(i.side)?i.side:0,yaw:Number.isFinite(i.yaw)?i.yaw:p.yaw,pitch:Number.isFinite(i.pitch)?i.pitch:0,fire:i.fire===true,reload:i.reload===true,sprint:i.sprint===true,jump:i.jump===true};p.lastInput=Date.now();
   }
  }catch(e){send(ws,{type:'error',message:e instanceof SyntaxError?'Ungültige Nachricht.':String(e.message||'Fehler'),fatal:!p});}
 });
 ws.on('close',()=>{clearTimeout(joinTimeout);if(room&&p){leaveLobby(room,ws);if(!room.clients.size)rooms.delete(room.code);else if(room.phase==='waiting')announce(room);}});
});
let frame=0;setInterval(()=>{for(const r of rooms.values()){if(r.phase!=='playing')continue;for(const p of r.game.players)if(Date.now()-(p.lastInput||0)>400)p.input={};tick(r.game,1/30);if(frame%2===0)broadcast(r,{type:'state',state:snapshot(r.game)});}frame++;},1000/30);
setInterval(()=>{for(const ws of wss.clients){if(!ws.alive){ws.terminate();continue;}ws.alive=false;ws.ping();}},30000).unref();
server.listen(port,'0.0.0.0',()=>{console.log('SEKTOR 9 v0.5 — http://localhost:'+port);for(const a of lanAddresses())console.log('LAN: '+a);});
