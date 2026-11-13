# SEKTOR 9 — Version 0.4 / Lobby & Visual Overhaul

Eigenständiger 3D-Browser-FPS für PC mit Maus und Tastatur. Die Karte WERK 09, drei Waffen, Team Deathmatch und die Trainingsbots bleiben erhalten. Keine Originaldateien aus S.K.I.L.L. Special Force 2.

## Schnellstart im lokalen Netzwerk (Windows)

1. Den alten Server beenden (CMD: Strg+C, gegebenenfalls Task-Manager → Node.js → Task beenden).
2. Die ZIP vollständig in einen neuen Ordner entpacken. Node.js LTS muss installiert sein. `START-WINDOWS.bat` doppelklicken. Beim ersten Start werden die npm-Abhängigkeiten installiert; dafür ist Internet nötig.
3. Das Konsolenfenster offen lassen und auf dem Server-PC `http://localhost:3000` im Browser öffnen.
4. Rufnamen eingeben, Waffe auswählen und **NEUEN RAUM ERSTELLEN** drücken. Die Wartelobby öffnet sich, noch ohne laufendes Match.
5. In der Lobby steht der Raumcode und eine Liste der lokalen Serveradressen. Wähle bei mehreren Adressen die IPv4-Adresse des WLAN-/LAN-Adapters (mit `ipconfig` am Server-PC nachprüfen). Kopiere den Einladungslink.
6. Freunde im selben Netzwerk öffnen den Link in ihrem Browser. Serveradresse und Raumcode sind bereits eingetragen. Sie geben ihren Namen ein, wählen eine Waffe und klicken auf **BEITRETEN**. Alternativ können sie `http://SERVER-IP:3000` öffnen, den Raumcode eingeben und beitreten.
7. Die Namen erscheinen live in der Lobby. Erst ab zwei Spielern kann der Host **SPIEL STARTEN** drücken. Alle Clients wechseln zum Match; jeder klickt auf **INS SPIEL**, um die Maus im Browser zu aktivieren.

Die Teams werden beim Start automatisch ausgeglichen. Maximal acht Spieler. Verlässt der Host den Wartesaal, wird der nächste Spieler Host. Ein laufendes Match nimmt keine neuen Spieler auf; für einen neuen Teilnehmer einen neuen Raum erstellen. Die normale automatische Folgerunde bleibt erhalten. Ein Raum verschwindet, wenn alle Teilnehmer ihn verlassen.

## Falls der andere PC nicht beitreten kann

- Nicht `localhost` auf dem anderen PC verwenden! Das zeigt immer auf den eigenen Rechner. Der andere PC benötigt die Adresse des Server-PCs, beispielsweise `http://192.168.1.12:3000` (nur Beispiel).
- Prüfen, ob beide Rechner im selben LAN/WLAN sind und Node.js in der Windows-Firewall für private Netzwerke erlaubt ist. Gast-WLAN/Client-Isolation können die Verbindung verhindern.
- Alte Serverversionen sind nicht mit der neuen Wartelobby kompatibel. Beide PC-Browser müssen die Seite des aktualisierten Servers öffnen; bei Bedarf Strg+F5 drücken.
- Ist Port 3000 belegt, den alten Server stoppen. Alternativ `node server.js --port 3001` verwenden und entsprechend Port 3001 aufrufen.

## GitHub Pages (Training)

ZIP vollständig entpacken und den Inhalt auf GitHub in den Hauptordner des Repositories hochladen. `index.html` muss direkt im Hauptverzeichnis liegen. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save. Nach dem Deployment Strg+F5. Im Menü steht VERSION 0.4.

GitHub Pages hostet nur die statische Seite, nicht den Node-Server. Für lokales Spielen die HTTP-Seite des lokalen Servers öffnen. Eine öffentliche HTTPS-Seite benötigt einen separat betriebenen WSS-Server mit TLS; der LAN-Server ist nicht für eine ungeschützte Internetfreigabe vorgesehen.

## Grafik

Ultra ist die Standardoption im Hauptmenü. Sie nutzt bis zu doppelter Pixeldichte (geräteabhängig) und eine 4096×4096-Schattenkarte. Hoch nutzt bis zu 1,45-fache Pixeldichte und 2048er Schatten, Mittel native Pixeldichte bis 1 und 1024er Schatten. Die Auswahl wird lokal gespeichert. Falls das Spiel ruckelt, auf Hoch oder Mittel wechseln. Hardwarebeschleunigung/WebGL im Browser ist erforderlich.

- Prozedurale 512px Materialtexturen mit Verschleiß, Relief/Bump-Mapping, Metall- und Betonoberflächen.
- Prozedurale Himmelspanorama-Textur, Umgebungsreflexionen, ACES-Tonemapping, warme Sonnenbeleuchtung und Dunst.
- Mehr Industriearchitektur, Rohrleitungen, Lüftungsgitter, Warnstreifen, Bodendetails.
- Gerundete Kanten an Waffen und Rüstung, zylindrische Läufe und Zielfernrohr, zusätzliche Waffendetails.
- Statische undurchsichtige Geometrien werden nach Material und Schatteneinstellungen zusammengefasst, um Draw Calls zu reduzieren.
- Keine zusätzliche Grafikdatei oder Asset-CDN erforderlich. Die Physik-Kollisionskarte bleibt unverändert. Kein Unreal-Engine-Rendering, keine Lumen-/Nanite-Funktionen.

## Steuerung

WASD bewegen · Maus zielen · Linksklick schießen · Rechtsklick ADS · R nachladen · G Granate (Training) · Shift sprinten · Leertaste springen · Tab Rangliste · Esc Pause/Maus freigeben. Granaten bleiben im Training verfügbar; der Online-Kampf nutzt die bisherige Simulation.

## Entwicklung

`npm ci` und `npm start` im entpackten Ordner. `npm test` testet Simulation und Lobbyregeln ohne Browser oder Netzwerkabhängigkeiten. `server.js` enthält HTTP-/WebSocket-Transport, `lobby.js` Raumverwaltung, `simulation.js` Spielregeln, `index.html` eingebetteten Browserclient und Three.js. Docker: `docker build -t sektor9 .` und `docker run --rm -p 3000:3000 sektor9`.

MIT, siehe LICENSE und THIRD_PARTY.md. Keine Produktionsabsicherung. Versionen: 0.1 Prototyp; 0.2 Grafik; 0.3 Kampf/ADS; 0.4 Wartelobby und Grafik-Überarbeitung.
