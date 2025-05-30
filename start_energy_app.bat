@echo off
echo Starting Energy Optimization System...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && python app.py"

echo.
echo Waiting for backend to initialize (5 seconds)...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && npm start"

echo.
echo Energy Optimization System is starting up!
echo.
echo Once loaded, you can access the application at: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul