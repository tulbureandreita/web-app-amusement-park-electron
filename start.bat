@echo off
setlocal

echo === Installing dependencies if missing ===

if not exist server\node_modules (
  echo Installing server dependencies...
  pushd server
  call npm install
  if errorlevel 1 (
    echo Server install failed!
    pause
    exit /b 1
  )
  popd
  timeout /t 2 >nul
)

if not exist client\node_modules (
  echo Installing client dependencies...
  pushd client
  call npm install --legacy-peer-deps
  if errorlevel 1 (
    echo Client install failed!
    pause
    exit /b 1
  )
  popd
  timeout /t 2 >nul
)

if not exist electron-app\node_modules (
  echo Installing electron dependencies...
  pushd electron-app
  call npm install
  if errorlevel 1 (
    echo Electron install failed!
    pause
    exit /b 1
  )
  popd
  timeout /t 2 >nul
)

echo === Launching Electron app ===
call npx electron electron-app/main.js

pause
endlocal
