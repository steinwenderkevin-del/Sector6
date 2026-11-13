@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Bitte zuerst Node.js LTS installieren: https://nodejs.org/
  pause
  exit /b 1
)
if not exist node_modules\ws\package.json (
  echo Installiere Server-Abhaengigkeiten...
  call npm ci
  if errorlevel 1 (
    echo Installation fehlgeschlagen. Internetverbindung pruefen.
    pause
    exit /b 1
  )
)
start "" http://localhost:3000
call npm start
pause
