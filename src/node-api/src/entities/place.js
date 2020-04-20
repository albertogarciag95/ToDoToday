export default function makePlace ({
    title,
    description,
    category,
    latitude,
    longitude,
    price_per_person = 0,
    dateStart,
    dateEnd
  } = {}) {
    if (!title || title.length > 30) {
      throw new Error('Place must have a title or is invalid')
    }
    if (!description) {
      throw new Error('Place must have a description.')
    }
    if (!category || isNaN(category)) {
      throw new Error("Place's category is invalid or null")
    }
    if (!latitude || isNaN(latitude)) {
      throw new Error('Place must have latitude')
    }
    if (!longitude || isNaN(longitude)) {
      throw new Error('Place must have longitude')
    }
    if (!price_per_person || isNaN(price_per_person)) {
      throw new Error('Comment must have a source.')
    }

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getCategory: () => category,
      getLatitude: () => latitude,
      getLongitude: () => longitude,
      getPrice: () => price_per_person,
      getDateStart: () => dateStart || 'no_date',
      getDateEnd: () => dateEnd || 'no_date',
      getText: () => sanitizedText,
      isFree: () => price_per_person === 0
    })
}
