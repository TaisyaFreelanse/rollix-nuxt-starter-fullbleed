@echo off
REM Скрипт для применения миграции системы бонусов через psql

set PGPASSWORD=DrrK6FVqpHbSJ4MkxbudwuLOe0GG5eG1
set HOST=dpg-d4mqip8dl3ps73e9vpv0-a.oregon-postgres.render.com
set PORT=5432
set DATABASE=rollix_db
set USERNAME=rollix_db_user

echo Применение миграции для системы бонусов...

REM Проверяем наличие psql
where psql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo psql не найден. Пожалуйста, установите PostgreSQL.
    echo Или примените SQL скрипт вручную: prisma\migrations\20241201_add_bonus_system_manual.sql
    pause
    exit /b 1
)

REM Применяем миграцию
psql -h %HOST% -p %PORT% -U %USERNAME% -d %DATABASE% -f prisma\migrations\20241201_add_bonus_system\migration.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Миграция успешно применена!
) else (
    echo.
    echo Ошибка при применении миграции. Попробуйте применить SQL скрипт вручную.
)

set PGPASSWORD=
pause

