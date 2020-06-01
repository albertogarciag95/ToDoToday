import https from 'https';
import Constants from '../constants';

export default function makeAddRealPlacesController({ postPlaceUseCase }) {
  return function addRealPlacesController () {

    return new Promise((resolve, reject) => {
      https.get(Constants.OPEN_DATA_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        })

        res.on('end', async () => {
          const foundPlaces = JSON.parse(data)["@graph"];
          let postedPlaces = [];

          const defaultCategoryName = 'Cultura y sociedad';

          const start = async () => {
            await asyncForEach(foundPlaces, async (placeInfo) => {
              if(isPlaceValidToInsert(placeInfo)) {
                const newPlace = await postPlaceUseCase({
                  dateStart: new Date(placeInfo.dtstart),
                  dateEnd: new Date(placeInfo.dtend) ,
                  ...placeInfo,
                  location: placeInfo['event-location'],
                  latitude: placeInfo.location ? placeInfo.location.latitude : 0,
                  longitude: placeInfo.location ? placeInfo.location.longitude : 0
                }, defaultCategoryName);

                postedPlaces = postedPlaces.concat(newPlace);
              }
            });

            resolve(postedPlaces);
          }

          async function asyncForEach(foundPlaces, callback) {
            for (let index = 0; index < foundPlaces.length; index++) {
              await callback(foundPlaces[index]);
            }
          }

          start();

        })
      }).on('error', (error) => {
        reject(`Got error: ${error.message}`);
      });

      function isPlaceValidToInsert(placeInfo) {
        return !!placeInfo.location;
      }

    });

  }
}
