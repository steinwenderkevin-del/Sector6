# Prüfstand — 13. November 2026

Node 24.22.1. `npm test`: 9 Tests bestanden, 0 fehlgeschlagen.

Geprüft: Teamverteilung und Spawnpunkte; Treffer, Abschüsse, Punkte und Respawn; Deckung durch Wände; Friendly-Fire-Sperre und Spawnschutz; Magazin und Nachladen; Kollision; Rundenende und Neustart; Spawn-Zustand; echte lokale WebSocket-Verbindung mit zwei Clients, gemeinsamem Raum, synchronisierter Bewegung, Trennung und ungültigem Raumcode.

`node --check` für Browsermodul und Server bestanden. Lobby im Browser auf Layout und Lesbarkeit geprüft.

**Nicht verifiziert:** 3D-Rendering, Pointer-Lock und echtes Spielgefühl auf einem Desktop-PC, da WebGL im verfügbaren Testbrowser deaktiviert war. Kein öffentlicher Server eingerichtet; noch kein Internet-Mehrspielertest mit menschlichen Spielern. Vor der ersten Freundesrunde lokal im PC-Browser testen.
