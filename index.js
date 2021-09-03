import { Linking } from 'react-native'


const getParams = (params = []) => {
  params = params
    .map(({ key, value }) => {
      return `${value}`
    })
    .join('/')
  
  return params
}


function getDirections({ destination, source, params = [], waypoints = [] } = {}) {
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
  )}`
  url = url.replace('driving/navigate/', '')
  
  return Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
}

export default getDirections
