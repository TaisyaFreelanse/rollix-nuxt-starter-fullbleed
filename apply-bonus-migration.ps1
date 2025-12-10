# Скрипт для применения миграции системы бонусов
# Использует External Database URL для подключения

$env:PGPASSWORD = "DrrK6FVqpHbSJ4MkxbudwuLOe0GG5eG1"
$host = "dpg-d4mqip8dl3ps73e9vpv0-a.oregon-postgres.render.com"
$port = "5432"
$database = "rollix_db"
$username = "rollix_db_user"

Write-Host "Применение миграции для системы бонусов..." -ForegroundColor Green

# Применяем SQL миграцию
$sqlScript = Get-Content -Path "prisma\migrations\20241201_add_bonus_system\migration.sql" -Raw

# Или используем ручной скрипт
if (-not (Test-Path "prisma\migrations\20241201_add_bonus_system\migration.sql")) {
    $sqlScript = Get-Content -Path "prisma\migrations\20241201_add_bonus_system_manual.sql" -Raw
    Write-Host "Используется ручной SQL скрипт" -ForegroundColor Yellow
}

# Проверяем наличие psql
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue

if ($psqlPath) {
    Write-Host "Найден psql: $($psqlPath.Source)" -ForegroundColor Green
    $sqlScript | & $psqlPath -h $host -p $port -U $username -d $database
} else {
    Write-Host "psql не найден. Пожалуйста, установите PostgreSQL или используйте другой клиент." -ForegroundColor Red
    Write-Host "Или примените SQL скрипт вручную:" -ForegroundColor Yellow
    Write-Host "  prisma\migrations\20241201_add_bonus_system_manual.sql" -ForegroundColor Yellow
}

$env:PGPASSWORD = ""

