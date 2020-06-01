import {AppError} from '../errors/AppError';

export default function makePlace ({
    id,
    title,
    description,
    category,
    latitude,
    longitude,
    location,
    price_per_person = 0,
    dateStart,
    dateEnd
  } = {}) {
    if (!title || title.length > 100) {
      throw new AppError(`Place must have a title or is invalid`, 400);
    }
    if (description === null || description === undefined) {
      throw new AppError(`Place ${title} must have a description.`, 400);
    }
    if (!category) {
      throw new AppError(`Place ${title} category is invalid or null.`, 400);
    }
    if (!latitude || isNaN(latitude)) {
      throw new AppError(`Place ${title} must have latitude`, 400);
    }
    if(!location) {
      throw new AppError(`Place ${title} must have location`, 400);
    }
    if (!longitude || isNaN(longitude)) {
      throw new AppError(`Place ${title} must have longitude`, 400);
    }

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getCategory: () => category,
      getLatitude: () => latitude,
      getLongitude: () => longitude,
      getLocation: () => location,
      getPrice: () => price_per_person,
      getDateStart: () => dateStart || 'no_date',
      getDateEnd: () => dateEnd || 'no_date',
      isFree: () => price_per_person === 0
    })
}
