// Fix for Google  Map DIrection IOS
import { Linking } from 'react-native'
const isValidLatLng = (num, range) => typeof num === 'number' && num <= range && num >= -1 * range

const isValidCoordinates = coords =>
  isValidLatLng(coords.latitude, 90) && isValidLatLng(coords.longitude, 180)

// const getParams = (params = []) => {
//   return params
//     .map(({ key, value }) => {
//       const encodedKey = encodeURIComponent(key)
//       const encodedValue = encodeURIComponent(value)
//       return `${encodedKey}=${encodedValue}`
//     })
//     .join('&')
// }

const getParams = (params = []) => { return params .map(({ key, value }) => { 
  const encodedKey = encodeURIComponent(key) 
  const encodedValue = encodeURIComponent(value) 
  return `${value}`}) .join('/') }
const getWaypoints = (waypoints = []) => {
  if (waypoints.length === 0) {
    return ''
  }

  const params = waypoints
    .map(value => `${value.latitude},${value.longitude}`)
    .join('/')

  return `/${params}`
}

function getDirections ({ destination, source, params = [], waypoints = [] } = {}) {
  if (source) {
    params.push({
      key: 'origin',
      value: `${source}`
    })
  }

  if (destination) {
    params.push({
      key: 'destination',
      value: `${destination}`
    })
  }

  

  var url = `https://www.google.com/maps/dir/${getParams(
    params
  )}${getWaypoints(waypoints)}`
  url = url.replace('driving/navigate/', '')

  console.log("url to send", url);
  return Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
}

export default getDirections
