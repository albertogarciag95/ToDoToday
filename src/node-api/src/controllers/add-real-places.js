import https from 'https';
import Constants from '../constants';

export default function makeAddRealPlacesController({ postPlaceUseCase }) {
  return async function addRealPlacesController () {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      https.get(Constants.OPEN_DATA_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        })

        res.on('end', () => {
          const foundPlaces = JSON.parse(data)["@graph"];
          const postedPlaces = [];

          const defaultCategoryName = 'Cultura y ocio';

          foundPlaces.forEach(async (placeInfo) => {
            postedPlaces.push(await postPlaceUseCase({
              dtstart: dateStart,
              dtend: dateEnd,
              ...placeInfo,
              latitude: location.latitude,
              longitude: location.longitude
            }, defaultCategoryName));
          });

          return postedPlaces;
        })
      }).on('error', (error) => {
        console.log("ERROR", error.message);
      });
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
