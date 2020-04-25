import cron from 'node-cron';
import { addRealPlacesController } from '../controllers';

export function addBatches() {

  // Request to open AI services to add real-time places on bbdd
  cron.schedule('00 57 17 * * *', function() {
    addRealPlacesController().then(
      response => console.log("Batch executed some real places added", response)
    );
  });

}
