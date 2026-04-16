@echo off
echo Installing dependencies... > install_status.txt
call npm install > install.log 2>&1
if %errorlevel% neq 0 (
  echo Install Failed >> install_status.txt
  exit /b %errorlevel%
)
echo Install Complete >> install_status.txt
echo Starting Server... >> install_status.txt
call npm run dev > server.log 2>&1
