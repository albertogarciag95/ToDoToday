export default function makePostItineraryController ({ postItineraryUseCase }) {
  return async function postItineraryController (httpRequest) {
    try {
      const itineraryPlaces = await postItineraryUseCase(
        httpRequest.body
      );
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(itineraryPlaces.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: itineraryPlaces
      }
    } catch (e) {
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
