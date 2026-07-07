@echo off
title Despliegue WebAbogado en Tomcat
color 0B

echo ============================================
echo   Desplegando WebAbogado en Tomcat 10.1
echo   EJECUTAR COMO ADMINISTRADOR
echo ============================================
echo.

set TOMCAT_WEBAPPS="C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps"
set PROYECTO=%~dp0

if not exist %TOMCAT_WEBAPPS% (
    echo [ERROR] No se encuentra: %TOMCAT_WEBAPPS%
    pause
    exit /b 1
)

echo [1/4] Compilando con Maven...
cd /d "%PROYECTO%"
call mvn clean package -DskipTests -q
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Fallo la compilacion de Maven
    pause
    exit /b 1
)
echo    OK

echo [2/4] Deteniendo Tomcat...
net stop Tomcat10

echo [3/4] Copiando WAR a Tomcat...
if exist %TOMCAT_WEBAPPS%\ROOT.war del %TOMCAT_WEBAPPS%\ROOT.war
if exist %TOMCAT_WEBAPPS%\ROOT rmdir /S /Q %TOMCAT_WEBAPPS%\ROOT
copy /Y "%PROYECTO%target\ROOT.war" %TOMCAT_WEBAPPS%\ROOT.war

echo [4/4] Iniciando Tomcat...
net start Tomcat10

echo.
echo ============================================
echo  Despliegue completado
echo  Abre: http://localhost:8080
echo ============================================
ping -n 4 127.0.0.1 > nul
start http://localhost:8080
