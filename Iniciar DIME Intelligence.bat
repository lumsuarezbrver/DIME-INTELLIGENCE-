@echo off
set "NODE_EXE=C:\Users\lumsu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if not exist "%NODE_EXE%" (
  echo No se encontro el entorno necesario para iniciar la aplicacion.
  pause
  exit /b 1
)

echo Iniciando DIME Intelligence...
echo Cuando aparezca "Ready", abra http://localhost:3000
"%NODE_EXE%" "%~dp0node_modules\next\dist\bin\next" dev
pause
