import https from 'https';
import Constants from '../constants';

export default function makeAddRealPlacesController({ postPlaceUseCase }) {

  return async function addRealPlacesController () {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
        return https.get(Constants.OPEN_DATA_URL, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; })

          res.on('end', async () => {
            const foundPlaces = JSON.parse(data)["@graph"];
            let postedPlaces = [];

            const defaultCategoryName = 'Cultura y sociedad';

            const startController = async () => {
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
              return {
                headers,
                statusCode: 200,
                body: postedPlaces
              };
            }

            async function asyncForEach(foundPlaces, callback) {
              for (let index = 0; index < foundPlaces.length; index++) {
                await callback(foundPlaces[index]);
              }
            }
            return await startController();
          })
        }).on('error', (error) => {
          console.log(`Cannot connect with: ${Constants.OPEN_DATA_URL} : ${error.message}`);
        });

        function isPlaceValidToInsert(placeInfo) {
          return !!placeInfo.location;
        }
    } catch(e) {
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
