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
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
