import useSWR from 'swr'
import useFetcher from './useFetcher'

export default function useCity() {
  const getFetcher = useFetcher({method: 'GET'})

  const {data, error, isLoading} = useSWR(['/static/json/city.json'], getFetcher)

  return [data, error, isLoading]
}