# SEKTOR 9 — Version 0.3 / Combat Update

Eigenständiger 3D-Browser-FPS für PC, Maus und Tastatur. Eine Arena, zwei Teams, Team-Deathmatch. Keine Originaldateien aus S.K.I.L.L. Special Force 2.

## GitHub Pages (Training)

1. ZIP entpacken. Lade den Inhalt des entpackten Ordners ins Hauptverzeichnis deines Repositorys (Branch `main`). Überschreibe die alten Dateien. `index.html` muss direkt im Hauptverzeichnis liegen, nicht in einem weiteren Ordner und nicht als `index(2).html`.
2. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
3. Sobald die Bereitstellung erfolgreich ist, öffne die Pages-URL und drücke Strg+F5. Im Menü steht VERSION 0.3 · COMBAT UPDATE.

## Lokal mit Server

Node.js LTS installieren. Unter Windows `START-WINDOWS.bat` öffnen oder in diesem Ordner im Terminal `npm ci` und danach `npm start` ausführen. Das Terminal offen lassen. Im Browser `http://localhost:3000` öffnen. Beim ersten Aufruf benötigt npm Internet. Training läuft auch ohne Multiplayer-Server; GitHub Pages stellt nur statische Dateien bereit.

## Multiplayer (bisherige Regeln)

Im selben WLAN öffnen Freunde `http://HOST-IP:3000` (IPv4 des Server-PCs, nicht localhost). Serveradresse `ws://HOST-IP:3000` eintragen; beim Standardport wird sie automatisch vorausgefüllt. Einer erstellt einen Raum, die anderen treten mit dem Raumcode bei. Eventuell Node.js in der Windows-Firewall für private Netzwerke erlauben. Der Server bindet an alle Netzwerkschnittstellen; nicht ungeschützt ins Internet freigeben. Über GitHub Pages (HTTPS) ist ein separater WSS-Server mit TLS erforderlich.

Die bestehende Multiplayer-Simulation wurde übernommen; es gibt noch keine neue Wartelobby oder hostgesteuerte Startfunktion. Granaten sind nur im Training verfügbar. Node-Server und Spielseite benutzen nun dieselbe index.html. Kein node_modules im ZIP, keine separaten Grafikdateien nötig.

## Versionen

- 0.1: Arena Werk 09, drei Waffen, fünf Trainingsbots, Raumcodes, Rangliste.
- 0.2: detailliertere Umgebung, Waffen und Soldaten, Beleuchtung, Animationen und HUD.
- 0.3: ADS (rechte Maustaste), Schuss- und Nachladeeffekte, Einschussspuren, Granaten (G, Training).

## Steuerung

WASD bewegen · Maus zielen · Linksklick schießen · Rechtsklick ADS · R nachladen · G Granate (Training) · Shift sprinten · Leertaste springen · Tab Rangliste · Esc Pause/Maus freigeben.

## Dateien und Entwicklung

- `index.html`: vollständiger Browserclient, Three.js und Grafik eingebettet.
- `server.js`: HTTP-/WebSocket-Server.
- `simulation.js`: ursprüngliche autoritative Multiplayer-Spielregeln.
- `package.json`, `package-lock.json`: Node-Abhängigkeiten und Befehle.
- `npm test`: lokale Simulationstests (kein Browser oder Internet erforderlich).
- Docker: `docker build -t sektor9 .` und `docker run --rm -p 3000:3000 sektor9`.

Projektlizenz MIT; siehe LICENSE und THIRD_PARTY.md. Keine fertige Produktionsabsicherung oder öffentliche Serverbereitstellung.
