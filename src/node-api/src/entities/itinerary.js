import { AppError } from '../errors/AppError';

export default function makeItinerary ({
    places,
    startPoint,
    startDate,
    totalPrice,
    totalDistance
  } = {}) {

    if (!places || places.length === 0) {
      throw new AppError(`Itinerary must have an array of places`, 400);
    }
    if (!startPoint) {
      throw new AppError(`Itinerary must have start point`, 400);
    }
    if (!startDate) {
      throw new AppError(`Itinerary must have start date`, 400);
    }
    if (totalPrice === null || totalPrice === undefined || isNaN(totalDistance)) {
      throw new AppError(`Itinerary must have totalPrice`, 400);
    }
    if (totalDistance === null || totalDistance === undefined || isNaN(totalDistance)) {
      throw new AppError(`Itinerary must have total distance`, 400);
    }

    return Object.freeze({
      getPlaces: () => places,
      getStartPoint: () => startPoint,
      getStartDate: () => startDate,
      getTotalPrice: () => totalPrice,
      getTotalDistance: () => totalDistance
    });
}
