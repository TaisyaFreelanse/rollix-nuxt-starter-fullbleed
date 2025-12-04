export default defineEventHandler(async (event) => {
  // Для JWT токенов logout обычно происходит на клиенте (удаление токена)
  // Но можно добавить логику инвалидации токенов в будущем
  return {
    success: true,
    message: 'Выход выполнен успешно'
  }
})

