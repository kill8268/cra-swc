export default function useFetcher({ method }) {

  const fetcher = async ([url, params, options]) => {
    let _options
    if (options) {
      _options = options
    } else {
      _options = {
        method: method || 'GET',
      }
      switch (method) {
        case 'GET':
        case 'DELETE':
          params && (url += `?${new URLSearchParams(params).toString()}`)
          break
        case 'POST':
        case 'PUT':
        case 'PATCH':
          options.body = JSON.stringify(params)
          options.headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
          break
        default:
          params && (url += `?${new URLSearchParams(params).toString()}`)
      }
    }
    const res = await window.fetch(url, _options)
    if (res.status >= 400) {
      throw new Error(`fetcher error[${res.status}]: ${res.statusText}`)
    }
    return res.json()
  }

  return fetcher
}
