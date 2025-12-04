import { createSmsCodesTable } from '~/server/utils/migrations'

export default defineEventHandler(async () => {
  try {
    await createSmsCodesTable()
    return {
      success: true,
      message: 'Migration completed successfully'
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Migration failed'
    }
  }
})

