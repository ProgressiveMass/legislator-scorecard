import turf from 'turf'
import massSenate from './simplified_mass_geo.json'

// ========================================================
//  expects point in form {lat: 42.3566053, lng: -71.1062795}
// ========================================================
export default function findDistrict (pointObj) {
  // geojson uses x,y (lng, lat) instead of traditional way
  const point = turf.point([pointObj.lng, pointObj.lat])
  const matches = massSenate.features.filter((f) => {
      // f is already a geojson polygon
    return turf.inside(point, f)
  })

  if (matches.length) {
    return matches[0].properties
  } else {
    return 'Error: Could not find your Masachusetts district'
  }
}
