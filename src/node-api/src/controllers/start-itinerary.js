export default function makeAddItineraryController ({ startItineraryUseCase }) {
  return async function startItineraryController (httpRequest) {
    try {
      await startItineraryUseCase(httpRequest.body);
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
