import cron from 'node-cron';
import { addRealPlacesController } from '../controllers';

export function addBatches() {

  // Request to open API services to add real-time places on bbdd
  cron.schedule('00 55 17 * * *', function() {
    addRealPlacesController().then(
      response => console.log(response)
    ).catch(
      error => console.error("ALGO HA IDO MAL: ", error)
    )
  });

}
