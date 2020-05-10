import cron from 'node-cron';
import { addRealPlacesController, removePastPlacesController } from '../controllers';

export function addBatches() {

  cron.schedule('00 06 19 * * *', async () => {
    await addRealPlacesController();
    console.log("BATCH EXECUTED AND REAL PLACES ADDED");
  });

  cron.schedule('00 09 12 * * *', async () => {
    const places = await removePastPlacesController();
    console.log("BATCH EXECUTED AND SOME PLACES REMOVED", places);
  });

}
