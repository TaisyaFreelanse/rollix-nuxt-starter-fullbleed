# ⚠️ ВАЖНО: Добавьте DATABASE_URL вручную

К сожалению, через API Render я не могу получить connection string базы данных напрямую. 
Вам нужно добавить его вручную через dashboard.

## 📋 ШАГИ:

### 1. Получите Connection String:

1. Откройте: https://dashboard.render.com/d/dpg-d4mqip8dl3ps73e9vpv0-a
2. Прокрутите вниз до раздела **"Connections"**
3. Найдите **"Internal Database URL"** - это строка вида:
   ```
   postgresql://rollix_db_user:password@dpg-xxxxx-a.oregon-postgres.render.com/rollix_db
   ```
4. **СКОПИРУЙТЕ** эту строку полностью

### 2. Добавьте в Environment Variables:

1. Откройте: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
2. Перейдите в раздел **"Environment"** (в левом меню)
3. Нажмите **"Add Environment Variable"**
4. Добавьте:
   - **Key**: `DATABASE_URL`
   - **Value**: вставьте скопированный Internal Database URL
5. Нажмите **"Save Changes"**

Это автоматически запустит новый деплой.

### 3. После деплоя выполните миграции:

1. Откройте Shell на Render: https://dashboard.render.com/web/srv-d4mqj16mcj7s73cgv21g
2. Перейдите в раздел **"Shell"**
3. Выполните:
   ```bash
   npm run render:setup
   ```
   
   Или вручную:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

## ✅ Готово!

После этого ваше приложение будет полностью настроено и работать на:
**https://rollix-delivery.onrender.com**

