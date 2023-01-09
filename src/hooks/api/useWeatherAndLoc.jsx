import useSWR from 'swr'
import React from 'react'
import useFetcher from './useFetcher'
import {Context} from '@/providers/Global'

export default function useCity() {
  const {state: {location}} = React.useContext(Context)

  const getFetcher = useFetcher({method: 'GET'})

  const {data, error, isLoading} = useSWR(location && ['/v1/current.json', {
    ...location,
    q: `${location.latitude},${location.longitude}`,
    aqi: 'no',
    key: 'c3796da958134a2095a20816222112'
  }], getFetcher)

  return [data, error, isLoading]
}