import https from 'https';


export default function makeAddRealPlacesController() {
  return async function addRealPlacesController () {

    const URL = 'https://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=json&file=0&filename=206974-0-agenda-eventos-culturales-100&mgmtid=6c0b6d01df986410VgnVCM2000000c205a0aRCRD&preview=full';
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      https.get(URL, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        })

        res.on('end', () => {
          console.log(JSON.parse(data)["@graph"])
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
