# SEKTOR 9 — Browser-FPS-Prototyp 0.1

Ein eigenständiger kleiner 3D-Arena-Shooter für PC, Maus und Tastatur. Keine Verbindung zu S.K.I.L.L. oder dessen Rechteinhabern. Spielmodelle, Karte, Interface und synthetische Sounds wurden für dieses Projekt neu erstellt. Es werden keine Originaldateien des Vorbilds benötigt oder mitgeliefert.

## Enthalten

- Eigene Arena „Werk 09“, zwei Teams, bis zu 8 menschliche Spieler pro Raum.
- Team-Deathmatch: 30 Abschüsse oder 5 Minuten, anschließend automatische neue Runde.
- Drei Waffen, Munition, Nachladen, Sprinten, Springen, Zoomen, Lebenspunkte und 3-Sekunden-Respawn.
- Zwei Sekunden Spawnschutz; Schießen beendet den Schutz. Kein Friendly Fire.
- Offline-Training mit fünf Bots; Wegsuche durch die Karte.
- Raumcodes, Einladungslinks und Tab-Rangliste.
- Autoritativer Node-Spielserver: Der Client sendet Eingaben, nicht Treffer oder Punkte.
- Kein Login, kein Tracking, kein Shop. Name und Serveradresse werden im eigenen Browser gespeichert.

## Schnell am eigenen PC testen

1. Aktuelles Node.js LTS installieren (getestet mit Node 24).
2. ZIP entpacken. Ein Terminal im Ordner mit `package.json` öffnen.
3. `npm ci` ausführen.
4. `npm start` ausführen und das Terminal offen lassen.
5. `http://localhost:3000` am PC in Chrome, Edge oder Firefox öffnen.
6. **Training starten**. Die Maus wird im Spiel eingefangen; **Esc** gibt sie frei.

Nicht die HTML-Datei per Doppelklick öffnen: ES-Module benötigen einen Webserver.

## Auf GitHub Pages hochladen

1. Ein neues Repository erstellen, z. B. `sektor9`.
2. Den **Inhalt** dieses Projektordners hochladen: `docs`, `server.js`, `package.json`, `package-lock.json` usw. `node_modules` NICHT hochladen.
3. Im Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch** wählen.
4. Branch `main`, Ordner `/docs` wählen und speichern.
5. Nach dem Pages-Deployment die angezeigte URL öffnen. Das Training läuft dort direkt.

GitHub Pages hostet nur den statischen Browserteil. Ein Repository oder Pages allein betreibt keinen Node-/WebSocket-Server. Für Online-Partien braucht ihr einen separat laufenden Server. Quelle: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Multiplayer über das Internet

Den beiliegenden Server auf einem Node- oder Docker-Host betreiben, der dauerhafte WebSocket-Verbindungen unterstützt. Ein eigener VPS oder ein entsprechender Containerdienst ist geeignet; je nach Anbieter entstehen Kosten. Es wurde kein Hosting gebucht oder eingerichtet.

Konfiguration für einen Node-Host:

- Repository: dieses Projekt
- Installationsbefehl: `npm ci`
- Startbefehl: `npm start`
- Port: Umgebungsvariable `PORT` des Anbieters (Standard 3000)
- Healthcheck: `/health`
- HTTPS/WSS beim Anbieter aktivieren. Der Anbieter terminiert TLS vor dem Node-Prozess.
- Optional `ALLOWED_ORIGINS=https://DEINNAME.github.io` setzen (Origin ohne Repository-Pfad und ohne abschließenden Slash). Mehrere erlaubte Origins mit Komma trennen. Ohne Variable werden alle Browser-Origins akzeptiert.

Alternativ Docker:

```sh
docker build -t sektor9 .
docker run --rm -p 3000:3000 sektor9
```

Auch vor Docker ist für die öffentliche Nutzung über GitHub Pages ein HTTPS/WSS-Reverse-Proxy erforderlich. WSS lässt sich nicht durch bloßes Umbenennen einer unverschlüsselten `ws://`-Adresse aktivieren.

1. Alle öffnen eure GitHub-Pages-Seite.
2. Unter **Multiplayer-Server** dieselbe Adresse eintragen, z. B. `wss://euer-tatsaechlicher-host.example` (Beispiel ersetzen).
3. Einer klickt **Neuen Raum erstellen** und danach **Ins Spiel**.
4. Den angezeigten Raumcode an Freunde weitergeben; sie wählen **Beitreten**. Alternativ **Einladung kopieren** und den Link teilen.
5. Teams werden beim Beitritt abwechselnd vergeben. Mit einem einzelnen Spieler gibt es noch keinen menschlichen Gegner. Online werden keine Bots hinzugefügt.

Der Raumcode ist der Zugang für eure Freundesrunde, aber kein Benutzerkonto oder Passwort. Raumcodes/Einladungen nicht öffentlich posten, wenn Fremde nicht beitreten sollen. Serverneustarts und leere Räume löschen deren Zustand.

### Im gleichen WLAN/LAN

Ein PC startet `npm start`. Die anderen öffnen `http://LAN-IP-DES-HOSTS:3000` und tragen `ws://LAN-IP-DES-HOSTS:3000` ein. Ggf. Node in der Firewall für das private Netzwerk zulassen. `localhost` bezeichnet immer den eigenen PC, nicht den des Freundes. Diese LAN-Adresse funktioniert nicht automatisch über das Internet.

## Steuerung

| Taste | Funktion |
| --- | --- |
| WASD | Bewegen |
| Maus | Umsehen / zielen |
| Linke Maustaste halten | Schießen |
| Rechte Maustaste | Zoom |
| R | Nachladen |
| Linke Shift-Taste | Sprinten (kein Schießen beim Sprinten) |
| Leertaste | Springen |
| Tab halten | Rangliste |
| Esc | Maus freigeben / Menü |

Im Menü: Mausempfindlichkeit und Lautstärke. Das Training pausiert bei freigegebener Maus; Online-Partien laufen weiter.

## Grenzen dieses Prototyps

Einfache geometrische Figuren und Waffen, eine Karte, ein Modus. Keine realistischen Animationen, kein Bombenmodus, keine Accounts, keine Touchsteuerung, keine Lag-Kompensation und kein vollständiges Anti-Cheat. Online-Bewegung wird geglättet, hat aber noch keine Client-Vorhersage; hohe Latenz ist spürbar. Spieler kollidieren mit Wänden, nicht miteinander. Treffer nutzen vereinfachte Körpervolumen ohne Headshot-Multiplikator. Zielplattform ist ein PC-Browser mit WebGL 2.

Serverseitige Raum-/Spielerlimits, Payloadlimit, Nachrichtenlimit und Heartbeat sind enthalten; dies ist dennoch kein gehärteter öffentlicher Produktionsdienst. Der mitgelieferte Server ist als einzelne Instanz ausgelegt (kein Multi-Instance-Routing).

## Eigene Gestaltung und Lizenzen

Projektcode: MIT, siehe `LICENSE`. Three.js: MIT; die mitgelieferte Lizenz `docs/vendor/THREE-LICENSE.txt` muss erhalten bleiben. Der Server verwendet `ws` (MIT, installiert durch npm; siehe `THIRD_PARTY.md`).

Kein kopierter Name, Logo, Kartenlayout, Charakter, Sound, UI oder Modell aus S.K.I.L.L. Gemeinsame Genre-Mechaniken sind lediglich die Inspiration. „SEKTOR 9“ ist ein Arbeitstitel; es wurde keine Markenrecherche oder juristische Freigabe durchgeführt. Diese Eigenständigkeit ist keine Garantie, dass weltweit keinerlei Rechte Dritter berührt werden. Vor einer kommerziellen Veröffentlichung Namen und Rechte gesondert prüfen lassen.

## Entwicklung

`npm test` prüft Regeln und eine echte lokale WebSocket-Partie mit zwei Clients. Browserdateien liegen unter `docs/`; die gemeinsamen Spielregeln in `docs/simulation.js`; der Server in `server.js`. Die Three.js-Dateien sind lokal enthalten, daher ist für das Training nach dem Laden kein CDN nötig.
