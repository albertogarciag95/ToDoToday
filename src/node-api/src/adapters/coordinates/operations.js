export default function makeCoordinatesOperations({ geolib }) {

  return Object.freeze({
    getDistanceBetweenCoordinates
  })

  function getDistanceBetweenCoordinates(place1, place2) {
    return geolib.getDistance(
      { latitude: place1.latitude, longitude: place1.longitude },
      { latitude: place2.latitude, longitude: place2.longitude }
    )
  }
}
