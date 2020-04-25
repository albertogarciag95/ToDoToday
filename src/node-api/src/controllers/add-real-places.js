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

          const defaultCategoryName = 'Cultura y sociedad';

          foundPlaces.forEach(async (placeInfo) => {

            if(isPlaceValidToInsert(placeInfo)) {
              const newPlace = await postPlaceUseCase({
                dateStart: placeInfo.dtstart,
                dateEnd: placeInfo.dtend ,
                ...placeInfo,
                location: placeInfo['event-location'],
                latitude: placeInfo.location ? placeInfo.location.latitude : 0,
                longitude: placeInfo.location ? placeInfo.location.longitude : 0
              }, defaultCategoryName);

              postedPlaces.push(newPlace);
              console.log("postedPlaces", postedPlaces);
            }

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

    function isPlaceValidToInsert(placeInfo) {
      return !!placeInfo.location;
    }

  }
}
