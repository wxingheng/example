export default {
  // baseUrl: location.origin
  // const isDev = process.env.NODE_ENV === 'development'
  // baseUrl: process.env.NODE_ENV === 'development' ? 'https://sbc.stpass.com' : location.origin
  baseUrl: process.env.NODE_ENV === 'development' ? location.origin : location.origin

}
