import useSWR from 'swr'
import useFetcher from './useFetcher'

export default function useWeatherName() {
  const getFetcher = useFetcher({method: 'GET'})

  const {data, error, isLoading} = useSWR(['/static/json/weather.json'], getFetcher)

  return [data, error, isLoading]
}