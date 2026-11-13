import {createGame,addPlayer} from './simulation.js';
export function createLobby(code){return {code,phase:'waiting',host:null,game:createGame(),clients:new Map()};}
export function joinLobby(room,socket,id,name,weapon){
 if(room.phase!=='waiting')throw Error('Das Match läuft bereits. Erstelle einen neuen Raum.');
 if(room.clients.size>=8)throw Error('Dieser Raum ist voll (8 Spieler).');
 const p=addPlayer(room.game,id,String(name||'Spieler').trim().slice(0,18)||'Spieler',Number(weapon));
 room.clients.set(socket,p);if(!room.host)room.host=p.id;return p;
}
export function leaveLobby(room,socket){const p=room.clients.get(socket);if(!p)return;room.clients.delete(socket);room.game.players=room.game.players.filter(x=>x!==p);if(room.host===p.id)room.host=room.clients.values().next().value?.id??null;}
export function lobbySnapshot(room){return {room:room.code,host:room.host,phase:room.phase,players:room.game.players.map(p=>({id:p.id,name:p.name,team:p.team,weapon:p.weapon}))};}
export function startLobby(room,id){
 if(id!==room.host)throw Error('Nur der Host kann das Match starten.');
 if(room.phase!=='waiting')throw Error('Das Match wurde bereits gestartet.');
 if(room.clients.size<2)throw Error('Mindestens zwei Spieler werden benötigt.');
 // Recreate a fresh match at t=0; keep socket references and player identities.
 const game=createGame();for(const p of room.clients.values()){const fresh=addPlayer(game,p.id,p.name,p.weapon);Object.assign(p,fresh);game.players[game.players.length-1]=p;}
 room.game=game;room.phase='playing';return game;
}
