export default function makeRemovePastPlacesController({ removePlaceUseCase, listPlacesUseCase }) {
  return async function removePastPlacesController () {
    const headers = {
      'Content-Type': 'application/json'
    }
    const result = [];

    try {
      const places = await listPlacesUseCase();
      const startController = async () => {
        await asyncForEach(places, async (place) => {
          if(place.dateEnd && new Date(place.dateEnd) < new Date("2028-08-30")) {
            await removePlaceUseCase(place);
            result.push(place);
          }
        });
        return {
          headers,
          statusCode: 200,
          body: result
        };
      }

      async function asyncForEach(foundPlaces, callback) {
        for (let index = 0; index < foundPlaces.length; index++) {
          await callback(foundPlaces[index]);
        }
      }

      return startController();

    } catch (e) {
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
