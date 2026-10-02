JARVIS UNIVERSAL – Handy + Chromebook

Was enthalten ist:
- responsive JARVIS-Oberfläche
- Spracheingabe und Sprachausgabe
- echte KI über OpenAI Responses API
- API-Schlüssel bleibt auf dem Server
- PWA-Grundgerüst für Installation auf Android/ChromeOS

Voraussetzung:
- Ein Server mit Node.js
- ein OpenAI API-Schlüssel

Start:
1. Diesen Ordner auf den Server kopieren.
2. `npm install` ausführen.
3. `.env.example` nach `.env` kopieren.
4. In `.env` OPENAI_API_KEY eintragen.
5. `npm start` ausführen.
6. Die HTTPS-Adresse auf Handy und Chromebook öffnen.
7. Im Browser „Zum Startbildschirm hinzufügen“ / „Installieren“ wählen.

Wichtig: Für die Nutzung auf beiden Geräten muss der Server öffentlich per HTTPS erreichbar sein. Die HTML-Datei allein kann den API-Schlüssel nicht sicher enthalten.
