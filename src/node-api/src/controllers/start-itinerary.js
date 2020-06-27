export default function makeAddItineraryController ({ startItineraryUseCase, saveUserItineraryUseCase }) {
  return async function startItineraryController (httpRequest) {
    try {
      const response = await startItineraryUseCase(httpRequest.body);
      const { id } = response;

      await saveUserItineraryUseCase(id, httpRequest.user);

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {}
      }
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
