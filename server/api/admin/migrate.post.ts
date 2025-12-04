import { createSmsCodesTable } from '~/server/utils/migrations'

export default defineEventHandler(async (event) => {
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

