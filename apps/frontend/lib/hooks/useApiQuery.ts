import { useQuery } from '@tanstack/react-query'
import { apiFetcher } from '../utils/fetcher'

export const useApiQuery = <T>(
  endpoint: string,
  key: string[],
  options?: RequestInit,
) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => apiFetcher(endpoint, options),
  })
}
