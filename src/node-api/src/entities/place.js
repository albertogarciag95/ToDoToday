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
      throw new Error(`Place must have a title or is invalid`);
    }
    if (description === null || description === undefined) {
      throw new Error(`Place ${title} must have a description.`);
    }
    if (!category) {
      throw new Error(`Place ${title} category is invalid or null.`);
    }
    if (!latitude || isNaN(latitude)) {
      throw new Error(`Place ${title} must have latitude`);
    }
    if(!location) {
      throw new Error(`Place ${title} must have location`);
    }
    if (!longitude || isNaN(longitude)) {
      throw new Error(`Place ${title} must have longitude`);
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
