import cron from 'node-cron';
import { addRealPlacesController } from '../controllers';

export function addBatches() {

  // Request to open API services to add real-time places on bbdd
  cron.schedule('00 03 21 * * *', function() {
    const realPlaces = addRealPlacesController();
    console.log("Batch executed some real places added", realPlaces);
  });

}
