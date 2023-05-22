import useSWR from 'swr'
import supbase from '@lib/supbase';

export default function useTaskList() {
  const {data, error, isLoading} = useSWR(supbase
    .from('task')
    .select())

  return [data, error, isLoading]  
}