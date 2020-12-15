export const createResponse = (success = true, data, message) => ({
  flag: success,
  data,
  message,
})