# SEKTOR 9 v0.4 – Testbericht

Erfolgreich:
- JavaScript-Syntaxprüfung des gesamten Browser-Skripts sowie server.js und lobby.js.
- `npm test`: 6/6 Tests erfolgreich. Darunter Host-Rechte, Mindestanzahl, Spielerliste, Teamverteilung, Start bei t=0, Gastgeberwechsel, Raumlimit, Ablehnung später Beitritte und bestehende Kampf-/Rundenregeln.
- Browser-UI mit Playwright, simuliertem WebSocket und ersetzt dargestelltem Renderer: Raum erstellen, Einladungslink mit LAN-Adresse, Spielerliste, Start erst mit zwei Spielern, Host-Button, Startnachricht, Match/HUD/Timer, Eingaben an Server, Gast ohne Startbutton, Raum verlassen und Training aller drei Waffen mit Schießen, Nachladen und Granaten.
- Alle Dateien im ZIP auf Vollständigkeit und Integrität geprüft.

Einschränkungen:
- Der Chromium-WebGL-Test in der aktuellen Umgebung scheiterte an fehlendem WebGL-Kontext. Tatsächliche Grafik, Shaderdarstellung und Bildrate müssen auf einem PC mit WebGL getestet werden. Die Geometrie- und UI-Initialisierung wurde im simulierten Renderer erfolgreich geprüft.
- Ein vollständiger Live-WebSocket-Test mit zwei echten Clients war hier nicht möglich, da die npm-Registry in der Testumgebung nicht erreichbar war. Die Serverlogik und UI wurden separat geprüft. Der Windows-Start benötigt Node.js und die installierte ws-Abhängigkeit.
- Keine Leistungsversprechen, kein öffentlicher Server. Die Granaten-Simulation bleibt auf Training beschränkt.
