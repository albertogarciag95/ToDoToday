import cron from 'node-cron';
import { addRealPlacesController, removePastPlacesController } from '../controllers';

export function addBatches() {

  cron.schedule('00 57 20 * * *', async () => {
    await addRealPlacesController();
    console.log("BATCH EXECUTED AND REAL PLACES ADDED");
  });

  cron.schedule('00 56 20 * * *', async () => {
    const places = await removePastPlacesController();
    console.log("BATCH EXECUTED AND SOME PLACES REMOVED", places);
  });

}
