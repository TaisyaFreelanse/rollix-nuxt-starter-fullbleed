import { createSmsCodesTable } from '~/server/utils/migrations'

export default defineEventHandler(async (event) => {
  // Проверяем секретный ключ из env
  const migrationKey = process.env.MIGRATION_KEY || 'migration-key-2024'
  const requestKey = getHeader(event, 'x-migration-key')
  
  if (requestKey !== migrationKey) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  try {
    await createSmsCodesTable()
    return {
      success: true,
      message: 'Migration completed successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Migration failed'
    })
  }
})

