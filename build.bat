@echo off
echo ============================================
echo  Estudio Juridico - Build Script
echo ============================================
echo.

set PROJECT_DIR=%~dp0
set SRC_DIR=%PROJECT_DIR%src\main\java
set WEB_DIR=%PROJECT_DIR%src\main\webapp
set BUILD_DIR=%PROJECT_DIR%build
set CLASSES_DIR=%BUILD_DIR%\classes

if not exist "%BUILD_DIR%" mkdir "%BUILD_DIR%"
if not exist "%CLASSES_DIR%" mkdir "%CLASSES_DIR%"

echo [1/3] Compilando clases Java...
dir /s /b "%SRC_DIR%\*.java" > "%BUILD_DIR%\sources.txt" 2>nul

REM Check if sources.txt has content
for %%? in ("%BUILD_DIR%\sources.txt") do if %%~z? equ 0 (
    echo    No se encontraron archivos Java.
    goto :war
)

REM Try to find servlet-api.jar in common Tomcat locations
set SERVLET_JAR=
if exist "%CATALINA_HOME%\lib\servlet-api.jar" set SERVLET_JAR=%CATALINA_HOME%\lib\servlet-api.jar
if exist "%CATALINA_HOME%\lib\jakarta.servlet-api-*.jar" for %%i in ("%CATALINA_HOME%\lib\jakarta.servlet-api-*.jar") do set SERVLET_JAR=%%i
if exist "%CATALINA_HOME%\lib\javax.servlet-api-*.jar" for %%i in ("%CATALINA_HOME%\lib\javax.servlet-api-*.jar") do set SERVLET_JAR=%%i

if "%SERVLET_JAR%"=="" (
    echo    ADVERTENCIA: No se encontro servlet-api.jar.
    echo    Debe tener Tomcat instalado y configurar CATALINA_HOME.
    echo    Compilando sin classpath (puede fallar)...
    javac -d "%CLASSES_DIR%" -encoding UTF-8 @"%BUILD_DIR%\sources.txt"
) else (
    echo    Usando: %SERVLET_JAR%
    javac -d "%CLASSES_DIR%" -cp "%SERVLET_JAR%" -encoding UTF-8 @"%BUILD_DIR%\sources.txt"
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Fallo la compilacion.
    pause
    exit /b 1
)
echo    Compilacion exitosa.

:war
echo.
echo [2/3] Copiando recursos web...
xcopy /E /I /Y "%WEB_DIR%" "%BUILD_DIR%\webapp" > nul

echo.
echo [3/3] Empaquetando WAR...
REM Copy compiled classes to WEB-INF/classes
if exist "%CLASSES_DIR%" (
    if not exist "%BUILD_DIR%\webapp\WEB-INF\classes" mkdir "%BUILD_DIR%\webapp\WEB-INF\classes"
    xcopy /E /I /Y "%CLASSES_DIR%\*" "%BUILD_DIR%\webapp\WEB-INF\classes\" > nul
)

REM Create WAR file
cd "%BUILD_DIR%\webapp"
jar -cf "%PROJECT_DIR%..\ROOT.war" * 2>nul || (
    jar cf "%PROJECT_DIR%..\estudiojuridico.war" * 2>nul || (
        REM Try creating war without jar tool
        echo    No se pudo crear el WAR (jar no disponible).
        echo    Puede copiar la carpeta "build\webapp" directamente a Tomcat/webapps/
    )
)

if exist "%PROJECT_DIR%..\ROOT.war" echo    WAR creado: ..\ROOT.war
if exist "%PROJECT_DIR%..\estudiojuridico.war" echo    WAR creado: estudiojuridico.war
if not exist "%PROJECT_DIR%..\ROOT.war" if not exist "%PROJECT_DIR%..\estudiojuridico.war" (
    echo.
    echo    El WAR se creara manualmente:
    echo    1. Copie la carpeta "build\webapp" a su servidor
    echo    2. O importe el proyecto en Eclipse/IntelliJ
)

echo.
echo ============================================
echo  Build completo.
echo ============================================
pause
