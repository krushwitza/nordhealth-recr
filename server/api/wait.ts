export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return true
})
