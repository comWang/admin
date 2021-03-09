export const createResponse = (success = true, data, message = 'ok') => ({
  flag: success,
  data,
  message,
})