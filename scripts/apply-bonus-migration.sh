#!/bin/bash
# Скрипт для применения миграции системы бонусов через psql
# Использование: bash scripts/apply-bonus-migration.sh

# Параметры подключения к базе данных Render
export PGPASSWORD="DrrK6FVqpHbSJ4MkxbudwuLOe0GG5eG1"
DB_HOST="dpg-d4mqip8dl3ps73e9vpv0-a.oregon-postgres.render.com"
DB_USER="rollix_db_user"
DB_NAME="rollix_db"

echo "🚀 Начинаем применение миграции системы бонусов..."
echo "📡 Подключение к базе данных: $DB_HOST"

# Выполняем SQL скрипт
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f prisma/migrations/20241201_add_bonus_system_manual.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ Миграция применена успешно!"
    echo "💡 Теперь система бонусов должна работать корректно."
else
    echo ""
    echo "❌ Ошибка при применении миграции"
    exit 1
fi

