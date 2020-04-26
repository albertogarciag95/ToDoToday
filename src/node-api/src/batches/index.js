import cron from 'node-cron';
import { addRealPlacesController } from '../controllers';

export function addBatches() {

  cron.schedule('00 06 19 * * *', async () => {
    await addRealPlacesController();
    console.log("BATCH EXECUTED AND REAL PLACES ADDED");
  });

}
