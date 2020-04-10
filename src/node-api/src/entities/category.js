export default function buildMakeCategory () {
  
  return function makeCategory ({ id, name } = {}) {
    if (!id) {
      throw new Error('Category must have a valid id.')
    }
    if (!name) {
      throw new Error('Category must have an id')
    }

    return Object.freeze({
      getName: () => name,
      getId: () => id
    })
  }
}
