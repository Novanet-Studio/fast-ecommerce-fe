import ky from 'ky-universal'

export default function ({ $http }) {
  $http.onRequest(config => {
    console.log('Making request to ' + config.url)
  })


  $http.onError(error => {
    if (error.statusCode === 500) {
      alert('Request Error!')
    }
  })

}