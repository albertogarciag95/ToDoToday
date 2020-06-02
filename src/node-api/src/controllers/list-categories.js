export default function makeListCategoriesController ({ listCategoriesUseCase }) {
  return async function listCategoriesController () {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const categories = await listCategoriesUseCase();
      return {
        headers,
        statusCode: 200,
        body: categories
      }
    } catch (e) {
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
