import { useQuery } from '@tanstack/react-query'
import { apiFetcher } from '../utils/fetcher'
import { redirect } from 'next/navigation'
import { UnauthorizedError } from '../utils/error'

export const useApiQuery = <T>(
  endpoint: string,
  key: string[],
  options?: RequestInit,
) => {
  const query = useQuery<T>({
    queryKey: key,
    queryFn: () => apiFetcher(endpoint, options),
    retry: (failureCount, error) => {
      if (error instanceof UnauthorizedError) {
        return false
      }
      return failureCount < 3
    },
  })

  if (query.error instanceof UnauthorizedError) {
    redirect('/login')
  } else {
    return query
  }
}
